# iléSure API Documentation

**Version:** 1.0.0  
**Base URL:** `https://api.iléSure.com/v1`  
**Environment:** Production  

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Waitlist](#2-waitlist)
3. [Users](#3-users)
4. [Properties](#4-properties)
5. [Roommate Matching](#5-roommate-matching)
6. [Agent Verification](#6-agent-verification)
7. [Payments](#7-payments)
8. [Notifications](#8-notifications)
9. [Messages](#9-messages)
10. [Testimonials](#10-testimonials)
11. [FAQ](#11-faq)
12. [Static Content](#12-static-content)
13. [Error Codes](#13-error-codes)

---

## 1. Authentication

### 1.1 Register User
Register a new user (student or agent).

**Endpoint:** `POST /auth/register`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | User's email address (valid email format) |
| `password` | `string` | Yes | Password (min 8 characters, must include uppercase, lowercase, number) |
| `firstName` | `string` | Yes | User's first name |
| `lastName` | `string` | Yes | User's last name |
| `phone` | `string` | Yes | Phone number ( Nigerian format: +234...) |
| `userType` | `enum` | Yes | `"student"` or `"agent"` |
| `university` | `string` | Conditional | University name (required if `userType` is `"student"`) |
| `nin` | `string` | Conditional | National Identification Number (required if `userType` is `"agent"`) |

#### Example Request
```json
{
  "email": "adaeze@student.lcu.edu.ng",
  "password": "SecurePass123",
  "firstName": "Adaeze",
  "lastName": "Okonkwo",
  "phone": "+2348012345678",
  "userType": "student",
  "university": "Lead City University"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "usr_abc123def456",
      "email": "adaeze@student.lcu.edu.ng",
      "firstName": "Adaeze",
      "lastName": "Okonkwo",
      "phone": "+2348012345678",
      "userType": "student",
      "university": "Lead City University",
      "avatar": null,
      "emailVerified": false,
      "createdAt": "2025-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `user.id` | `string` | Unique user identifier |
| `user.email` | `string` | User's email address |
| `user.firstName` | `string` | User's first name |
| `user.lastName` | `string` | User's last name |
| `user.phone` | `string` | User's phone number |
| `user.userType` | `string` | Type of user: `"student"` or `"agent"` |
| `user.university` | `string` | University name (for students) |
| `user.avatar` | `string \| null` | Profile picture URL |
| `user.emailVerified` | `boolean` | Whether email is verified |
| `user.createdAt` | `string` | ISO 8601 timestamp |
| `token` | `string` | JWT access token (expires in 1 hour) |
| `refreshToken` | `string` | Refresh token (expires in 7 days) |

---

### 1.2 Login
Authenticate an existing user.

**Endpoint:** `POST /auth/login`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | User's email address |
| `password` | `string` | Yes | User's password |

#### Example Request
```json
{
  "email": "adaeze@student.lcu.edu.ng",
  "password": "SecurePass123"
}
```

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "usr_abc123def456",
      "email": "adaeze@student.lcu.edu.ng",
      "firstName": "Adaeze",
      "lastName": "Okonkwo",
      "phone": "+2348012345678",
      "userType": "student",
      "university": "Lead City University",
      "avatar": "https://cdn.iléSure.com/avatars/usr_abc123def456.jpg",
      "emailVerified": true,
      "createdAt": "2025-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
  }
}
```

---

### 1.3 Refresh Token
Get a new access token using refresh token.

**Endpoint:** `POST /auth/refresh`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refreshToken` | `string` | Yes | Valid refresh token |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "bmV3IHJlZnJlc2ggdG9rZW4..."
  }
}
```

---

### 1.4 Forgot Password
Request a password reset link.

**Endpoint:** `POST /auth/forgot-password`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | User's registered email |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### 1.5 Reset Password
Reset password using token from email.

**Endpoint:** `POST /auth/reset-password`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `string` | Yes | Reset token from email |
| `newPassword` | `string` | Yes | New password (min 8 chars) |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### 1.6 Logout
Invalidate the current session.

**Endpoint:** `POST /auth/logout`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
```

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. Waitlist

### 2.1 Join Waitlist
Add a user to the early access waitlist.

**Endpoint:** `POST /waitlist`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Full name |
| `email` | `string` | Yes | Valid email address |
| `phone` | `string` | No | Phone number (optional) |
| `university` | `string` | Yes | University/Institution name |
| `preferredArea` | `string` | No | Preferred area (e.g., "Toll Gate", "Bodija") |
| `budgetRange` | `string` | No | Budget range (e.g., "₦50k - ₦80k") |

#### Example Request
```json
{
  "name": "Adaeze Okonkwo",
  "email": "adaeze@example.com",
  "phone": "+2348012345678",
  "university": "Lead City University",
  "preferredArea": "Toll Gate",
  "budgetRange": "₦80k - ₦120k"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist",
  "data": {
    "id": "wl_xyz789abc012",
    "name": "Adaeze Okonkwo",
    "email": "adaeze@example.com",
    "phone": "+2348012345678",
    "university": "Lead City University",
    "preferredArea": "Toll Gate",
    "budgetRange": "₦80k - ₦120k",
    "position": 1247,
    "referralCode": "iléSure-ADA25",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique waitlist entry ID |
| `name` | `string` | Full name |
| `email` | `string` | Email address |
| `phone` | `string \| null` | Phone number |
| `university` | `string` | University name |
| `preferredArea` | `string \| null` | Preferred area |
| `budgetRange` | `string \| null` | Budget range |
| `position` | `number` | Current position in waitlist |
| `referralCode` | `string` | Unique referral code for the user |
| `createdAt` | `string` | ISO 8601 timestamp |

---

### 2.2 Get Waitlist Count
Get the total number of people on the waitlist.

**Endpoint:** `GET /waitlist/count`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "totalCount": 1247,
    "lastUpdated": "2025-01-15T10:30:00Z"
  }
}
```

---

### 2.3 Check Waitlist Position
Check a user's position in the waitlist.

**Endpoint:** `GET /waitlist/position/:email`  
**Auth Required:** No

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `email` | `string` | Email address to lookup |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "email": "adaeze@example.com",
    "position": 1247,
    "referralCode": "iléSure-ADA25",
    "referralCount": 3,
    "referralUrl": "https://iléSure.com/ref/iléSure-ADA25"
  }
}
```

---

### 2.4 Get My Waitlist Status
Get current user's waitlist status.

**Endpoint:** `GET /waitlist/me`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
```

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "id": "wl_xyz789abc012",
    "position": 1247,
    "referralCode": "iléSure-ADA25",
    "referralCount": 3,
    "referrals": [
      {
        "name": "Tunde Fashola",
        "email": "tunde@example.com",
        "joinedAt": "2025-01-16T08:00:00Z"
      }
    ],
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

## 3. Users

### 3.1 Get Current User Profile
Get the authenticated user's profile.

**Endpoint:** `GET /users/me`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
```

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123def456",
    "email": "adaeze@student.lcu.edu.ng",
    "firstName": "Adaeze",
    "lastName": "Okonkwo",
    "phone": "+2348012345678",
    "userType": "student",
    "university": "Lead City University",
    "avatar": "https://cdn.iléSure.com/avatars/usr_abc123def456.jpg",
    "emailVerified": true,
    "phoneVerified": true,
    "ninVerified": false,
    "profile": {
      "bio": "Third year law student looking for a safe apartment near campus.",
      "budget": "₦80k - ₦120k",
      "preferredAreas": ["Toll Gate", "Bodija"],
      "moveInDate": "2025-09-01"
    },
    "preferences": {
      "notifications": {
        "email": true,
        "push": true,
        "whatsapp": false
      }
    },
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-16T14:20:00Z"
  }
}
```

---

### 3.2 Update User Profile
Update the authenticated user's profile.

**Endpoint:** `PATCH /users/me`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | `string` | No | First name |
| `lastName` | `string` | No | Last name |
| `phone` | `string` | No | Phone number |
| `avatar` | `string` | No | Avatar URL (base64 or URL) |
| `profile.bio` | `string` | No | User bio (max 500 chars) |
| `profile.budget` | `string` | No | Budget range |
| `profile.preferredAreas` | `string[]` | No | Array of preferred areas |
| `profile.moveInDate` | `string` | No | Expected move-in date (YYYY-MM-DD) |

#### Example Request
```json
{
  "firstName": "Adaeze",
  "profile": {
    "bio": "Third year law student looking for a safe apartment near campus.",
    "budget": "₦80k - ₦120k",
    "preferredAreas": ["Toll Gate", "Bodija"],
    "moveInDate": "2025-09-01"
  }
}
```

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "usr_abc123def456",
    "firstName": "Adaeze",
    "lastName": "Okonkwo",
    "phone": "+2348012345678",
    "avatar": "https://cdn.iléSure.com/avatars/usr_abc123def456.jpg",
    "profile": {
      "bio": "Third year law student looking for a safe apartment near campus.",
      "budget": "₦80k - ₦120k",
      "preferredAreas": ["Toll Gate", "Bodija"],
      "moveInDate": "2025-09-01"
    },
    "updatedAt": "2025-01-16T14:20:00Z"
  }
}
```

---

### 3.3 Upload Avatar
Upload a profile picture.

**Endpoint:** `POST /users/me/avatar`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `avatar` | `file` | Yes | Image file (JPEG, PNG, WebP; max 5MB) |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatar": "https://cdn.iléSure.com/avatars/usr_abc123def456_1705312800.jpg"
  }
}
```

---

### 3.4 Get User by ID
Get a specific user's public profile.

**Endpoint:** `GET /users/:id`  
**Auth Required:** No

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | User ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123def456",
    "firstName": "Adaeze",
    "lastName": "O",
    "userType": "student",
    "university": "Lead City University",
    "avatar": "https://cdn.iléSure.com/avatars/usr_abc123def456.jpg",
    "profile": {
      "bio": "Third year law student...",
      "budget": "₦80k - ₦120k",
      "preferredAreas": ["Toll Gate", "Bodija"]
    }
  }
}
```

---

### 3.5 Update Notification Preferences
Update user notification preferences.

**Endpoint:** `PATCH /users/me/notifications`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `boolean` | No | Enable email notifications |
| `push` | `boolean` | No | Enable push notifications |
| `whatsapp` | `boolean` | No | Enable WhatsApp notifications |
| `types` | `object` | No | Notification type preferences |

#### Example Request
```json
{
  "email": true,
  "push": true,
  "whatsapp": false,
  "types": {
    "newListings": true,
    "roommateMatches": true,
    "bookingUpdates": true,
    "promotions": false
  }
}
```

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Notification preferences updated",
  "data": {
    "preferences": {
      "email": true,
      "push": true,
      "whatsapp": false,
      "types": {
        "newListings": true,
        "roommateMatches": true,
        "bookingUpdates": true,
        "promotions": false
      }
    }
  }
}
```

---

## 4. Properties

### 4.1 List Properties
Get a paginated list of properties.

**Endpoint:** `GET /properties`  
**Auth Required:** No

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page (max 50) |
| `minPrice` | `number` | No | - | Minimum price per year |
| `maxPrice` | `number` | No | - | Maximum price per year |
| `beds` | `number` | No | - | Number of bedrooms |
| `baths` | `number` | No | - | Number of bathrooms |
| `propertyType` | `string` | No | - | Type: `"self-contain"`, `"flat"`, `"apartment"`, `"duplex"` |
| `area` | `string` | No | - | Area name (e.g., "Toll Gate", "Bodija") |
| `university` | `string` | No | - | University proximity |
| `distance` | `number` | No | - | Max distance from university (km) |
| `amenities` | `string[]` | No | - | Array of amenities |
| `furnished` | `boolean` | No | - | Filter furnished properties |
| `verified` | `boolean` | No | - | Filter only verified listings |
| `sortBy` | `string` | No | `"createdAt"` | Sort field: `"price"`, `"distance"`, `"createdAt"` |
| `sortOrder` | `string` | No | `"desc"` | Sort order: `"asc"` or `"desc"` |

#### Example Request
```
GET /properties?minPrice=300000&maxPrice=500000&beds=2&area=Toll+Gate&verified=true&sortBy=price&sortOrder=asc
```

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "prp_abc123def456",
        "title": "Crystal Heights - 2 Bedroom Flat",
        "description": "Modern 2 bedroom flat with all amenities, 5 minutes from LCU.",
        "propertyType": "flat",
        "beds": 2,
        "baths": 2,
        "price": 450000,
        "priceUnit": "year",
        "currency": "NGN",
        "images": [
          "https://cdn.iléSure.com/properties/prp_abc123_1.jpg",
          "https://cdn.iléSure.com/properties/prp_abc123_2.jpg"
        ],
        "virtualTour": "https://tour.iléSure.com/prp_abc123",
        "location": {
          "area": "Toll Gate",
          "address": "15 Oba Otudeko Street",
          "city": "Ibadan",
          "state": "Oyo",
          "coordinates": {
            "lat": 7.3964,
            "lng": 3.9473
          },
          "distanceToUniversity": 0.8,
          "distanceUnit": "km"
        },
        "amenities": [
          "24/7 Security",
          "Generator",
          "Water Supply",
          "Parking",
          "CCTV"
        ],
        "infrastructure": {
          "powerHours": "18 hours daily",
          "waterSource": "Borehole",
          "roadCondition": "Good",
          "internet": "Available"
        },
        "furnished": false,
        "available": true,
        "availableFrom": "2025-09-01",
        "agent": {
          "id": "usr_agent123",
          "name": "Property Masters Ltd",
          "avatar": "https://cdn.iléSure.com/agents/usr_agent123.jpg",
          "verified": true,
          "rating": 4.8
        },
        "verified": true,
        "verificationStatus": "approved",
        "views": 245,
        "saves": 32,
        "createdAt": "2025-01-10T08:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 5,
      "totalItems": 94,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Property Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique property ID |
| `title` | `string` | Property title |
| `description` | `string` | Full description |
| `propertyType` | `string` | Type: `"self-contain"`, `"flat"`, `"apartment"`, `"duplex"` |
| `beds` | `number` | Number of bedrooms |
| `baths` | `number` | Number of bathrooms |
| `price` | `number` | Price amount |
| `priceUnit` | `string` | Pricing unit (e.g., `"year"`, `"month"`) |
| `currency` | `string` | Currency code (`"NGN"`) |
| `images` | `string[]` | Array of image URLs |
| `virtualTour` | `string \| null` | Virtual tour URL |
| `location.area` | `string` | Area name |
| `location.address` | `string` | Street address |
| `location.city` | `string` | City name |
| `location.state` | `string` | State name |
| `location.coordinates.lat` | `number` | Latitude |
| `location.coordinates.lng` | `number` | Longitude |
| `location.distanceToUniversity` | `number` | Distance to nearest university |
| `location.distanceUnit` | `string` | Distance unit (`"km"` or `"miles"`) |
| `amenities` | `string[]` | List of amenities |
| `infrastructure.powerHours` | `string` | Average power availability |
| `infrastructure.waterSource` | `string` | Water source type |
| `infrastructure.roadCondition` | `string` | Road condition |
| `infrastructure.internet` | `string` | Internet availability |
| `furnished` | `boolean` | Whether property is furnished |
| `available` | `boolean` | Is property currently available |
| `availableFrom` | `string` | Date available from (YYYY-MM-DD) |
| `agent` | `object` | Agent/landlord info |
| `verified` | `boolean` | Is listing verified |
| `verificationStatus` | `string` | `"pending"`, `"approved"`, `"rejected"` |
| `views` | `number` | View count |
| `saves` | `number` | Number of saves |
| `createdAt` | `string` | ISO 8601 timestamp |

---

### 4.2 Get Property by ID
Get detailed information about a specific property.

**Endpoint:** `GET /properties/:id`  
**Auth Required:** No

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Property ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "id": "prp_abc123def456",
    "title": "Crystal Heights - 2 Bedroom Flat",
    "description": "Modern 2 bedroom flat with all amenities...",
    "propertyType": "flat",
    "beds": 2,
    "baths": 2,
    "toilets": 3,
    "size": "120 sqm",
    "floor": 2,
    "totalFloors": 3,
    "price": 450000,
    "priceUnit": "year",
    "currency": "NGN",
    "negotiable": true,
    "images": [
      "https://cdn.iléSure.com/properties/prp_abc123_1.jpg",
      "https://cdn.iléSure.com/properties/prp_abc123_2.jpg"
    ],
    "videoUrl": "https://video.iléSure.com/prp_abc123.mp4",
    "virtualTour": "https://tour.iléSure.com/prp_abc123",
    "location": {
      "area": "Toll Gate",
      "address": "15 Oba Otudeko Street",
      "city": "Ibadan",
      "state": "Oyo",
      "landmark": "Near First Bank Toll Gate",
      "coordinates": {
        "lat": 7.3964,
        "lng": 3.9473
      },
      "distanceToUniversity": 0.8,
      "distanceUnit": "km",
      "nearby": ["Lead City University", "Toll Gate Market", "First Bank"]
    },
    "amenities": ["24/7 Security", "Generator", "Water Supply", "Parking", "CCTV"],
    "infrastructure": {
      "powerHours": "18 hours daily",
      "waterSource": "Borehole",
      "roadCondition": "Good",
      "internet": "Available",
      "naturalLight": "Excellent"
    },
    "rules": ["No pets allowed", "No smoking", "Quiet hours after 10pm"],
    "furnished": false,
    "available": true,
    "availableFrom": "2025-09-01",
    "shareable": false,
    "roomsAvailable": 0,
    "agent": {
      "id": "usr_agent123",
      "name": "Property Masters Ltd",
      "avatar": "https://cdn.iléSure.com/agents/usr_agent123.jpg",
      "phone": "+2348012345678",
      "email": "agents@propertymasters.com",
      "verified": true,
      "rating": 4.8,
      "totalListings": 12,
      "responseRate": 95,
      "responseTime": "Within an hour"
    },
    "verified": true,
    "verificationStatus": "approved",
    "views": 245,
    "saves": 32,
    "createdAt": "2025-01-10T08:00:00Z",
    "updatedAt": "2025-01-12T10:00:00Z"
  }
}
```

---

### 4.3 Create Property (Agent)
Create a new property listing.

**Endpoint:** `POST /properties`  
**Auth Required:** Yes (Agent only)

#### Request Headers
```
Authorization: Bearer <token>
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Property title (max 100 chars) |
| `description` | `string` | Yes | Full description (max 2000 chars) |
| `propertyType` | `string` | Yes | `"self-contain"`, `"flat"`, `"apartment"`, `"duplex"` |
| `beds` | `number` | Yes | Number of bedrooms (1-10) |
| `baths` | `number` | Yes | Number of bathrooms |
| `toilets` | `number` | No | Number of toilets |
| `size` | `string` | No | Property size (e.g., "120 sqm") |
| `floor` | `number` | No | Floor number |
| `totalFloors` | `number` | No | Total floors in building |
| `price` | `number` | Yes | Price amount |
| `priceUnit` | `string` | Yes | Pricing unit: `"year"`, `"month"` |
| `negotiable` | `boolean` | No | Default false |
| `images` | `string[]` | Yes | Array of image URLs (min 3, max 10) |
| `videoUrl` | `string` | No | Video tour URL |
| `virtualTour` | `string` | No | Virtual tour URL |
| `location.area` | `string` | Yes | Area name |
| `location.address` | `string` | Yes | Street address |
| `location.city` | `string` | Yes | City name |
| `location.state` | `string` | Yes | State name |
| `location.landmark` | `string` | No | Nearby landmark |
| `location.coordinates.lat` | `number` | Yes | Latitude |
| `location.coordinates.lng` | `number` | Yes | Longitude |
| `amenities` | `string[]` | No | List of amenities |
| `infrastructure` | `object` | No | Infrastructure details |
| `rules` | `string[]` | No | Property rules |
| `furnished` | `boolean` | No | Default false |
| `availableFrom` | `string` | Yes | Available from date (YYYY-MM-DD) |
| `shareable` | `boolean` | No | Default false |
| `roomsAvailable` | `number` | Conditional | Required if shareable is true |

#### Example Request
```json
{
  "title": "Crystal Heights - 2 Bedroom Flat",
  "description": "Modern 2 bedroom flat with all amenities, 5 minutes from LCU.",
  "propertyType": "flat",
  "beds": 2,
  "baths": 2,
  "toilets": 3,
  "size": "120 sqm",
  "floor": 2,
  "totalFloors": 3,
  "price": 450000,
  "priceUnit": "year",
  "negotiable": true,
  "images": [
    "https://cdn.iléSure.com/properties/prp_abc123_1.jpg",
    "https://cdn.iléSure.com/properties/prp_abc123_2.jpg"
  ],
  "virtualTour": "https://tour.iléSure.com/prp_abc123",
  "location": {
    "area": "Toll Gate",
    "address": "15 Oba Otudeko Street",
    "city": "Ibadan",
    "state": "Oyo",
    "landmark": "Near First Bank Toll Gate",
    "coordinates": {
      "lat": 7.3964,
      "lng": 3.9473
    }
  },
  "amenities": ["24/7 Security", "Generator", "Water Supply", "Parking", "CCTV"],
  "infrastructure": {
    "powerHours": "18 hours daily",
    "waterSource": "Borehole",
    "roadCondition": "Good"
  },
  "furnished": false,
  "availableFrom": "2025-09-01"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Property listing created successfully",
  "data": {
    "id": "prp_new123abc456",
    "title": "Crystal Heights - 2 Bedroom Flat",
    "verificationStatus": "pending",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 4.4 Update Property
Update an existing property listing.

**Endpoint:** `PATCH /properties/:id`  
**Auth Required:** Yes (Property owner/agent only)

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Property ID |

#### Request Body

Same fields as POST, all optional (only include fields to update).

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Property updated successfully",
  "data": {
    "id": "prp_abc123def456",
    "title": "Updated Property Title",
    "updatedAt": "2025-01-16T14:20:00Z"
  }
}
```

---

### 4.5 Delete Property
Delete a property listing.

**Endpoint:** `DELETE /properties/:id`  
**Auth Required:** Yes (Property owner/agent only)

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Property ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### 4.6 Save Property
Save a property to favorites.

**Endpoint:** `POST /properties/:id/save`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Property ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Property saved to favorites"
}
```

---

### 4.7 Unsave Property
Remove a property from favorites.

**Endpoint:** `DELETE /properties/:id/save`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Property ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Property removed from favorites"
}
```

---

### 4.8 Get Saved Properties
Get user's saved/favorited properties.

**Endpoint:** `GET /users/me/saved`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "properties": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 2,
      "totalItems": 35,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### 4.9 Get Areas
Get list of available areas.

**Endpoint:** `GET /properties/areas`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "areas": [
      {
        "name": "Toll Gate",
        "propertyCount": 45,
        "avgPrice": 420000
      },
      {
        "name": "Bodija",
        "propertyCount": 32,
        "avgPrice": 380000
      },
      {
        "name": "Oba Otudeko",
        "propertyCount": 28,
        "avgPrice": 520000
      }
    ]
  }
}
```

---

## 5. Roommate Matching

### 5.1 Submit Roommate Quiz
Submit quiz answers to get roommate matches.

**Endpoint:** `POST /roommate/quiz`  
**Auth Required:** Yes

#### Request Headers
```
Authorization: Bearer <token>
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `budget` | `string` | Yes | Budget range: `"budget-low"`, `"budget-mid"`, `"budget-high"` |
| `lifestyle` | `string` | Yes | Lifestyle: `"party"`, `"study"`, `"balanced"`, `"quiet"` |
| `cleanliness` | `string` | Yes | Cleanliness: `"very-clean"`, `"tidy"`, `"flexible"` |
| `sleepSchedule` | `string` | Yes | Sleep: `"early"`, `"late"`, `"flexible-sleep"` |
| `cooking` | `string` | No | Cooking habits: `"frequent"`, `"occasional"`, `"never"` |
| `guests` | `string` | No | Guest frequency: `"often"`, `"sometimes"`, `"rarely"` |
| `smoking` | `boolean` | No | Smoking preference |
| `pets` | `boolean` | No | Pet preference |
| `religion` | `string` | No | Religious practice: `"strict"`, `"moderate"`, `"not-practicing"` |
| `noiseLevel` | `string` | No | Noise: `"quiet"`, `"moderate"`, `"noisy"` |

#### Example Request
```json
{
  "budget": "budget-mid",
  "lifestyle": "study",
  "cleanliness": "very-clean",
  "sleepSchedule": "late",
  "cooking": "occasional",
  "guests": "sometimes",
  "smoking": false,
  "pets": false,
  "religion": "moderate",
  "noiseLevel": "quiet"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "data": {
    "submissionId": "quiz_abc123def456",
    "compatibilityScore": 87,
    "profile": {
      "budget": "budget-mid",
      "lifestyle": "study",
      "cleanliness": "very-clean",
      "sleepSchedule": "late"
    },
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 5.2 Get Roommate Matches
Get compatible roommate matches based on quiz answers.

**Endpoint:** `GET /roommate/matches`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 10 | Items per page (max 20) |
| `minMatch` | `number` | No | 70 | Minimum match percentage (0-100) |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "userId": "usr_match123",
        "name": "Tunde A.",
        "avatar": "https://cdn.iléSure.com/avatars/usr_match123.jpg",
        "matchScore": 94,
        "commonTraits": [
          "Study Focused",
          "Night Owl",
          "Clean"
        ],
        "compatibility": {
          "budget": "compatible",
          "lifestyle": "compatible",
          "cleanliness": "compatible",
          "sleepSchedule": "compatible"
        },
        "property": {
          "id": "prp_shared123",
          "title": "2 Bedroom Flat - 1 Room Available",
          "price": 450000,
          "location": {
            "area": "Toll Gate",
            "distanceToUniversity": 0.8
          }
        },
        "mutualConnections": 0,
        "status": "pending"
      },
      {
        "userId": "usr_match456",
        "name": "Ada M.",
        "avatar": "https://cdn.iléSure.com/avatars/usr_match456.jpg",
        "matchScore": 89,
        "commonTraits": [
          "Balanced",
          "Early Bird",
          "Tidy"
        ],
        "compatibility": {
          "budget": "compatible",
          "lifestyle": "partial",
          "cleanliness": "compatible",
          "sleepSchedule": "partial"
        },
        "property": null,
        "mutualConnections": 2,
        "status": "pending"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 3,
      "totalItems": 25
    }
  }
}
```

#### Match Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `string` | Matched user's ID |
| `name` | `string` | Matched user's display name |
| `avatar` | `string` | Profile picture URL |
| `matchScore` | `number` | Compatibility percentage (0-100) |
| `commonTraits` | `string[]` | Shared traits |
| `compatibility` | `object` | Detailed compatibility by category |
| `compatibility.budget` | `string` | `"compatible"`, `"partial"`, `"incompatible"` |
| `property` | `object \| null` | Shared property if available |
| `mutualConnections` | `number` | Number of mutual connections |
| `status` | `string` | `"pending"`, `"interested"`, `"matched"`, `"connected"` |

---

### 5.3 Express Interest in Match
Express interest in connecting with a potential roommate.

**Endpoint:** `POST /roommate/matches/:userId/interest`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | `string` | Matched user's ID |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `propertyId` | `string` | No | Property ID to share |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Interest expressed. You'll be notified when they respond.",
  "data": {
    "status": "interested",
    "targetUserId": "usr_match123",
    "targetUserNotified": true
  }
}
```

---

### 5.4 Accept/Decline Match Request
Respond to a roommate connection request.

**Endpoint:** `PATCH /roommate/requests/:requestId`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `requestId` | `string` | Connection request ID |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | `string` | Yes | `"accept"` or `"decline"` |

#### Response

**200 OK (Accept)**
```json
{
  "success": true,
  "message": "Connection accepted. Contact details shared.",
  "data": {
    "status": "connected",
    "contact": {
      "email": "tunde@example.com",
      "phone": "+2348012345678",
      "whatsapp": "https://wa.me/2348012345678"
    }
  }
}
```

**200 OK (Decline)**
```json
{
  "success": true,
  "message": "Request declined"
}
```

---

### 5.5 Get Connection Requests
Get incoming and outgoing roommate connection requests.

**Endpoint:** `GET /roommate/requests`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | `string` | No | `"all"` | Filter: `"incoming"`, `"outgoing"`, `"all"` |
| `status` | `string` | No | - | Filter by status: `"pending"`, `"accepted"`, `"declined"` |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "incoming": [
      {
        "requestId": "req_abc123",
        "fromUser": {
          "id": "usr_match123",
          "name": "Tunde A.",
          "avatar": "https://cdn.iléSure.com/avatars/usr_match123.jpg"
        },
        "matchScore": 91,
        "status": "pending",
        "property": {...},
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "outgoing": [
      {
        "requestId": "req_def456",
        "toUser": {
          "id": "usr_match789",
          "name": "Ada M.",
          "avatar": "https://cdn.iléSure.com/avatars/usr_match789.jpg"
        },
        "matchScore": 85,
        "status": "interested",
        "createdAt": "2025-01-14T08:00:00Z"
      }
    ],
    "connected": [
      {
        "requestId": "req_ghi789",
        "user": {...},
        "connectedAt": "2025-01-13T12:00:00Z"
      }
    ]
  }
}
```

---

### 5.6 Update Quiz Answers
Update roommate preference quiz answers.

**Endpoint:** `PUT /roommate/quiz`  
**Auth Required:** Yes

#### Request Body

Same as POST /roommate/quiz.

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Quiz answers updated",
  "data": {
    "submissionId": "quiz_abc123def456",
    "updatedAt": "2025-01-16T14:20:00Z"
  }
}
```

---

## 6. Agent Verification

### 6.1 Submit Verification Documents
Submit documents for agent/landlord verification.

**Endpoint:** `POST /verification/documents`  
**Auth Required:** Yes (Agent only)

#### Request Headers
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nin` | `file` | Yes | NIN card image (JPEG/PNG, max 10MB) |
| `bvn` | `file` | Yes | BVN document (JPEG/PNG, max 10MB) |
| `idCard` | `file` | Yes | Valid ID card (NIN, Driver's License, or Passport) |
| `proofOfOwnership` | `file` | Yes | Property ownership document (C of O, Rent Agreement, etc.) |
| `utilityBill` | `file` | Yes | Utility bill (not older than 3 months) |
| `selfie` | `file` | Yes | Live selfie with ID |
| `cacCert` | `file` | Conditional | CAC certificate (required for companies) |
| `directorId` | `file` | Conditional | Director's ID (required for companies) |

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Documents submitted for review",
  "data": {
    "verificationId": "ver_abc123def456",
    "status": "pending",
    "estimatedReviewTime": "2-3 business days",
    "submittedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 6.2 Get Verification Status
Get current verification status.

**Endpoint:** `GET /verification/status`  
**Auth Required:** Yes (Agent only)

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "status": "under_review",
    "submittedAt": "2025-01-15T10:30:00Z",
    "reviewedAt": null,
    "documents": {
      "nin": "verified",
      "bvn": "verified",
      "idCard": "verified",
      "proofOfOwnership": "under_review",
      "utilityBill": "verified",
      "selfie": "verified"
    },
    "issues": [],
    "message": "Your verification is under review. We'll notify you once complete."
  }
}
```

---

### 6.3 Resubmit Verification Document
Resubmit a rejected document.

**Endpoint:** `PATCH /verification/documents/:documentType`  
**Auth Required:** Yes (Agent only)

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentType` | `string` | Document type: `"nin"`, `"bvn"`, `"idCard"`, `"proofOfOwnership"`, `"utilityBill"`, `"selfie"` |

#### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `document` | `file` | Yes | New document file |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Document resubmitted successfully",
  "data": {
    "documentType": "proofOfOwnership",
    "status": "pending",
    "submittedAt": "2025-01-16T14:20:00Z"
  }
}
```

---

## 7. Payments

### 7.1 Create Payment Intent
Create a payment intent for booking.

**Endpoint:** `POST /payments/intent`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `propertyId` | `string` | Yes | Property ID to book |
| `amount` | `number` | Yes | Payment amount in kobo (smallest currency unit) |
| `type` | `string` | Yes | `"booking"` or `"roommate_matching"` |

#### Example Request
```json
{
  "propertyId": "prp_abc123def456",
  "amount": 45000000,
  "type": "booking"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_abc123def456",
    "amount": 45000000,
    "currency": "NGN",
    "description": "Booking payment for Crystal Heights - 2 Bedroom Flat",
    "paystackReference": "PSK_1234567890",
    "authorizationUrl": "https://paystack.com/pay/abc123",
    "status": "pending",
    "expiresAt": "2025-01-15T11:30:00Z"
  }
}
```

---

### 7.2 Verify Payment
Verify a payment transaction.

**Endpoint:** `GET /payments/verify/:reference`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `reference` | `string` | Paystack reference |

#### Response

**200 OK (Successful)**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_abc123def456",
    "status": "completed",
    "amount": 45000000,
    "currency": "NGN",
    "paidAt": "2025-01-15T10:45:00Z",
    "booking": {
      "id": "book_abc123def456",
      "propertyId": "prp_abc123def456",
      "status": "confirmed",
      "confirmationCode": "ILSUR-2025-ABC123"
    }
  }
}
```

---

### 7.3 Get Payment History
Get user's payment history.

**Endpoint:** `GET /payments`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page |
| `status` | `string` | No | - | Filter: `"pending"`, `"completed"`, `"failed"`, `"refunded"` |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "pay_abc123def456",
        "amount": 45000000,
        "currency": "NGN",
        "type": "booking",
        "status": "completed",
        "property": {
          "id": "prp_abc123def456",
          "title": "Crystal Heights - 2 Bedroom Flat"
        },
        "reference": "PSK_1234567890",
        "paidAt": "2025-01-15T10:45:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

---

### 7.4 Get Payment Details
Get detailed information about a specific payment.

**Endpoint:** `GET /payments/:id`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Payment ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "id": "pay_abc123def456",
    "amount": 45000000,
    "currency": "NGN",
    "type": "booking",
    "status": "completed",
    "breakdown": {
      "rent": 45000000,
      "platformFee": 1350000,
      "total": 46350000
    },
    "property": {...},
    "reference": "PSK_1234567890",
    "createdAt": "2025-01-15T10:30:00Z",
    "paidAt": "2025-01-15T10:45:00Z"
  }
}
```

---

## 8. Notifications

### 8.1 Get Notifications
Get user's notifications.

**Endpoint:** `GET /notifications`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page |
| `unreadOnly` | `boolean` | No | false | Filter only unread |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_abc123",
        "type": "new_listing",
        "title": "New Property Match!",
        "message": "A new property matching your preferences is now available in Toll Gate.",
        "data": {
          "propertyId": "prp_new123"
        },
        "read": false,
        "createdAt": "2025-01-15T10:30:00Z"
      },
      {
        "id": "notif_def456",
        "type": "roommate_match",
        "title": "High Match Found!",
        "message": "You have a 94% match with Tunde A. Connect now!",
        "data": {
          "userId": "usr_match123",
          "matchScore": 94
        },
        "read": false,
        "createdAt": "2025-01-15T09:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {...}
  }
}
```

#### Notification Types

| Type | Description |
|------|-------------|
| `new_listing` | New property matching preferences |
| `roommate_match` | New roommate match found |
| `connection_request` | Roommate connection request |
| `connection_accepted` | Roommate connection accepted |
| `booking_confirmed` | Booking confirmed |
| `payment_success` | Payment successful |
| `waitlist_update` | Waitlist position update |
| `app_launch` | App launch notification |

---

### 8.2 Mark Notification as Read
Mark a single notification as read.

**Endpoint:** `PATCH /notifications/:id/read`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Notification ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### 8.3 Mark All Notifications as Read
Mark all notifications as read.

**Endpoint:** `PATCH /notifications/read-all`  
**Auth Required:** Yes

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

### 8.4 Delete Notification
Delete a notification.

**Endpoint:** `DELETE /notifications/:id`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Notification ID |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

### 8.5 Register Push Token
Register a device for push notifications.

**Endpoint:** `POST /notifications/push-token`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `string` | Yes | Push notification token |
| `platform` | `string` | Yes | `"ios"`, `"android"`, `"web"` |

#### Response

**200 OK**
```json
{
  "success": true,
  "message": "Push token registered"
}
```

---

## 9. Messages

### 9.1 Get Conversations
Get user's message conversations.

**Endpoint:** `GET /messages/conversations`  
**Auth Required:** Yes

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 20 | Items per page |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_abc123",
        "participant": {
          "id": "usr_agent123",
          "name": "Property Masters Ltd",
          "avatar": "https://cdn.iléSure.com/agents/usr_agent123.jpg",
          "userType": "agent"
        },
        "property": {
          "id": "prp_abc123def456",
          "title": "Crystal Heights - 2 Bedroom Flat"
        },
        "lastMessage": {
          "content": "The property is still available. Would you like to schedule a viewing?",
          "senderId": "usr_agent123",
          "createdAt": "2025-01-15T10:30:00Z"
        },
        "unreadCount": 1
      }
    ],
    "pagination": {...}
  }
}
```

---

### 9.2 Get Messages in Conversation
Get messages in a specific conversation.

**Endpoint:** `GET /messages/conversations/:conversationId`  
**Auth Required:** Yes

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `conversationId` | `string` | Conversation ID |

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 50 | Items per page |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "conv_abc123",
      "participant": {...},
      "property": {...}
    },
    "messages": [
      {
        "id": "msg_abc123",
        "senderId": "usr_abc123def456",
        "content": "Is this property still available?",
        "attachments": [],
        "read": true,
        "createdAt": "2025-01-15T10:00:00Z"
      },
      {
        "id": "msg_def456",
        "senderId": "usr_agent123",
        "content": "The property is still available. Would you like to schedule a viewing?",
        "attachments": [],
        "read": false,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

---

### 9.3 Send Message
Send a message in a conversation.

**Endpoint:** `POST /messages`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `conversationId` | `string` | Conditional | Existing conversation ID (required if not first message) |
| `recipientId` | `string` | Conditional | Recipient user ID (required for new conversation) |
| `propertyId` | `string` | Conditional | Property ID (required for new conversation) |
| `content` | `string` | Yes | Message content (max 2000 chars) |
| `attachments` | `string[]` | No | Array of attachment URLs |

#### Example Request (New Conversation)
```json
{
  "recipientId": "usr_agent123",
  "propertyId": "prp_abc123def456",
  "content": "Hello, I'm interested in this property. Is it still available?"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "msg_new123",
      "conversationId": "conv_abc123",
      "senderId": "usr_abc123def456",
      "content": "Hello, I'm interested in this property. Is it still available?",
      "attachments": [],
      "createdAt": "2025-01-15T11:00:00Z"
    }
  }
}
```

---

### 9.4 Start Conversation
Start a new conversation with an agent about a property.

**Endpoint:** `POST /messages/start`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agentId` | `string` | Yes | Agent's user ID |
| `propertyId` | `string` | Yes | Property ID |
| `message` | `string` | Yes | Initial message (max 2000 chars) |

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Conversation started",
  "data": {
    "conversationId": "conv_new123",
    "messageId": "msg_new123"
  }
}
```

---

## 10. Testimonials

### 10.1 Get Testimonials
Get published testimonials.

**Endpoint:** `GET /testimonials`  
**Auth Required:** No

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | 1 | Page number |
| `limit` | `number` | No | 10 | Items per page |

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "test_abc123",
        "name": "Adaeze Okonkwo",
        "role": "300L, Law",
        "university": "Lead City University",
        "avatar": "https://cdn.iléSure.com/avatars/test_abc123.jpg",
        "quote": "iléSure helped me find a verified self-con just 5 minutes from school within 3 days.",
        "rating": 5,
        "location": "Bodija",
        "published": true,
        "createdAt": "2025-01-10T08:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

---

### 10.2 Submit Testimonial
Submit a new testimonial.

**Endpoint:** `POST /testimonials`  
**Auth Required:** Yes

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `quote` | `string` | Yes | Testimonial quote (max 500 chars) |
| `rating` | `number` | Yes | Rating (1-5) |

#### Example Request
```json
{
  "quote": "iléSure helped me find a verified self-con just 5 minutes from school within 3 days. The distance info and power ratings were spot on!",
  "rating": 5
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Testimonial submitted for review",
  "data": {
    "id": "test_new123",
    "status": "pending_review",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

## 11. FAQ

### 11.1 Get FAQs
Get all published FAQs.

**Endpoint:** `GET /faqs`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": "faq1",
        "question": "What is iléSure?",
        "answer": "iléSure (Yoruba for \"Safe Home\") is a student-focused housing discovery and roommate matching platform...",
        "order": 1,
        "published": true
      },
      {
        "id": "faq2",
        "question": "Who can list apartments on iléSure?",
        "answer": "Only verified agents, landlords, and registered property companies can create listings...",
        "order": 2,
        "published": true
      }
    ]
  }
}
```

---

### 11.2 Submit FAQ Question
Submit a question for the FAQ.

**Endpoint:** `POST /faqs/questions`  
**Auth Required:** No

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | User's email |
| `question` | `string` | Yes | Question (max 500 chars) |

#### Example Request
```json
{
  "email": "adaeze@example.com",
  "question": "How does the roommate matching algorithm work?"
}
```

#### Response

**201 Created**
```json
{
  "success": true,
  "message": "Question submitted. We'll respond via email.",
  "data": {
    "id": "faqq_abc123",
    "status": "submitted",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

## 12. Static Content

### 12.1 Get App Info
Get app information (for landing page).

**Endpoint:** `GET /app/info`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "name": "iléSure",
    "tagline": "Your safe home near campus",
    "version": "1.0.0",
    "launchDate": "2025-03-01",
    "socials": {
      "instagram": "https://instagram.com/iléSure",
      "twitter": "https://twitter.com/iléSure",
      "linkedin": "https://linkedin.com/company/iléSure",
      "facebook": "https://facebook.com/iléSure"
    },
    "contact": {
      "email": "hello@iléSure.com",
      "phone": "+2348071455374",
      "address": "Ibadan, Nigeria"
    },
    "stats": {
      "waitlistCount": 1247,
      "propertiesListed": 94,
      "studentsHoused": 156,
      "verifiedAgents": 23
    }
  }
}
```

---

### 12.2 Get Features
Get platform features list.

**Endpoint:** `GET /features`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "features": [
      {
        "id": "discovery",
        "icon": "Search",
        "title": "Smart Discovery",
        "description": "Filter by distance to campus, power stability, water availability, security, and more."
      },
      {
        "id": "roommate",
        "icon": "Users",
        "title": "Roommate Matching",
        "description": "Our compatibility engine scores you against potential roommates across 12 lifestyle dimensions."
      },
      {
        "id": "verified",
        "icon": "ShieldCheck",
        "title": "Verified Listings",
        "description": "Every agent and landlord is verified with NIN, BVN, and property documents."
      }
    ]
  }
}
```

---

### 12.3 Get How It Works Steps
Get the steps for "How It Works" section.

**Endpoint:** `GET /how-it-works`  
**Auth Required:** No

#### Response

**200 OK**
```json
{
  "success": true,
  "data": {
    "steps": [
      {
        "id": "step1",
        "step": "01",
        "icon": "UserPlus",
        "title": "Create Your Profile",
        "description": "Sign up as a student in minutes. Tell us your university, budget, preferred area, and lifestyle."
      },
      {
        "id": "step2",
        "step": "02",
        "icon": "SlidersHorizontal",
        "title": "Browse & Filter",
        "description": "Explore verified listings with full infrastructure details, power hours, water source, and distance."
      },
      {
        "id": "step3",
        "step": "03",
        "icon": "KeyRound",
        "title": "Book & Move In",
        "description": "Confirm your booking securely. For shared apartments, get matched with a compatible roommate."
      }
    ]
  }
}
```

---

## 13. Error Codes

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid or missing token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Resource already exists |
| `422` | Unprocessable Entity - Validation error |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Please enter a valid email address"
      }
    ]
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password |
| `AUTH_TOKEN_EXPIRED` | JWT token has expired |
| `AUTH_TOKEN_INVALID` | Invalid JWT token |
| `AUTH_UNAUTHORIZED` | User not authorized for this action |
| `USER_NOT_FOUND` | User doesn't exist |
| `USER_ALREADY_EXISTS` | Email already registered |
| `PROPERTY_NOT_FOUND` | Property doesn't exist |
| `PROPERTY_NOT_AVAILABLE` | Property is not available for booking |
| `PAYMENT_FAILED` | Payment processing failed |
| `PAYMENT_VERIFICATION_FAILED` | Payment verification failed |
| `VERIFICATION_PENDING` | Verification is still pending |
| `VERIFICATION_REJECTED` | Verification was rejected |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `FILE_TOO_LARGE` | Uploaded file exceeds size limit |
| `INVALID_FILE_TYPE` | Unsupported file type |

---

## Rate Limits

| Endpoint Group | Limit |
|----------------|-------|
| Authentication | 10 requests/minute |
| Waitlist | 5 requests/minute |
| Properties (Read) | 60 requests/minute |
| Properties (Write) | 20 requests/minute |
| Messages | 30 requests/minute |
| General API | 100 requests/minute |

---

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 1 hour. Use the refresh endpoint to get a new token.

---

## Pagination

List endpoints support pagination with the following parameters:

| Parameter | Type | Default | Max |
|-----------|------|---------|-----|
| `page` | `number` | 1 | - |
| `limit` | `number` | varies | 50-100 |

Response includes a pagination object:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "totalItems": 94,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Webhooks

### Events

| Event | Description |
|-------|-------------|
| `payment.completed` | Payment was successful |
| `payment.failed` | Payment failed |
| `booking.confirmed` | Booking was confirmed |
| `verification.approved` | Agent verification approved |
| `verification.rejected` | Agent verification rejected |
| `roommate.connected` | Two users connected as roommates |

### Webhook Payload Format

```json
{
  "event": "payment.completed",
  "timestamp": "2025-01-15T10:45:00Z",
  "data": {
    "paymentId": "pay_abc123",
    "amount": 45000000,
    "currency": "NGN"
  }
}
```
