# 🌸 Aura Beauty Supply — Enterprise System Architecture Documentation

This cloud-backed application handles high-end beauty commerce data models using an asynchronous Node.js engine connected to a live MongoDB Atlas cluster.

## 💾 Core Database Model Schemas (Section 2.4 & 2.5)

### 1. User Schema (`models/User.js`)
Stores authenticated concierge user profiles securely with automated string normalization.
* `email` (String, Unique, Lowercase, Required)
* `password` (String, Required)
* `createdAt` (Date, Default: Now)

### 2. Product Schema (`models/Product.js`)
Maps the 40+ dynamic luxury inventory array matrices directly into cloud documents.
* `id` (String, Unique, Required)
* `category` (String, Required)
* `name` (String, Required)
* `price` (Number, Required)
* `description` (String, Required)
* `image` (String, Required)

### 3. Order Schema (`models/Order.js`)
Tracks final checkout commitments and logs transactional historical records permanently.
* `userEmail` (String, Required)
* `items` (Array of sub-documents: ProductId, Name, Price, Quantity)
* `totalAmount` (Number, Required)
* `createdAt` (Date, Default: Now)