# Inventory Management System - MongoDB Database Model

## Overview

This document outlines the database model for a SaaS-based inventory management system using MongoDB. The model follows industry standards for inventory management and leverages MongoDB's document-oriented structure while maintaining proper relationships between collections.

## Collections Structure

### 1. Organizations

```json
{
  "_id": ObjectId,
  "name": String,
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "country": String,
    "postalCode": String
  },
  "contactEmail": String,
  "contactPhone": String,
  "subscription": {
    "plan": String,
    "startDate": Date,
    "endDate": Date,
    "status": String
  },
  "settings": {
    "currency": String,
    "timezone": String,
    "dateFormat": String
  },
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 2. Users

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "email": String,
  "passwordHash": String,
  "firstName": String,
  "lastName": String,
  "role": String,  // Admin, Manager, Staff, etc.
  "permissions": [String],
  "lastLogin": Date,
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 3. Warehouses

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "name": String,
  "code": String,
  "type": String,  // Primary, Secondary, etc.
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "country": String,
    "postalCode": String
  },
  "contactPerson": String,
  "contactPhone": String,
  "contactEmail": String,
  "capacity": Number,
  "capacityUnit": String,
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 4. Categories

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "name": String,
  "description": String,
  "parentCategoryId": ObjectId,  // Self-reference for hierarchy
  "attributes": [
    {
      "name": String,
      "dataType": String,
      "isRequired": Boolean,
      "defaultValue": Mixed
    }
  ],
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 5. Products

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "sku": String,
  "name": String,
  "description": String,
  "categoryId": ObjectId,  // Reference to Categories
  "unitOfMeasure": String,  // Each, Kg, Liter, etc.
  "barcode": String,
  "dimensions": {
    "length": Number,
    "width": Number,
    "height": Number,
    "unit": String
  },
  "weight": {
    "value": Number,
    "unit": String
  },
  "attributes": { // Dynamic properties based on category
    "color": String,
    "size": String,
    "material": String,
    // Other attributes
  },
  "cost": Number,
  "retailPrice": Number,
  "wholesalePrice": Number,
  "taxRate": Number,
  "reorderPoint": Number,
  "preferredVendorId": ObjectId,  // Reference to Vendors
  "images": [String],  // URLs or GridFS references
  "status": String,  // Active, Discontinued, etc.
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 6. Inventory

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "productId": ObjectId,  // Reference to Products
  "warehouseId": ObjectId,  // Reference to Warehouses
  "locationId": ObjectId,  // Reference to Locations
  "batchId": String,
  "serialNumbers": [String],
  "quantity": Number,
  "availableQuantity": Number,  // Quantity - Reserved
  "reservedQuantity": Number,
  "minQuantity": Number,
  "maxQuantity": Number,
  "expirationDate": Date,
  "manufactureDate": Date,
  "lastCountDate": Date,
  "status": String,  // In Stock, Low Stock, Out of Stock
  "createdAt": Date,
  "updatedAt": Date
}
```

### 7. Locations

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "warehouseId": ObjectId,  // Reference to Warehouses
  "name": String,
  "code": String,
  "type": String,  // Shelf, Bin, Pallet, etc.
  "aisle": String,
  "rack": String,
  "shelf": String,
  "bin": String,
  "capacity": Number,
  "capacityUnit": String,
  "isActive": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

### 8. Vendors

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "name": String,
  "code": String,
  "contactPerson": String,
  "email": String,
  "phone": String,
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "country": String,
    "postalCode": String
  },
  "website": String,
  "paymentTerms": String,
  "leadTime": Number,  // Days
  "rating": Number,
  "taxId": String,
  "currency": String,
  "notes": String,
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 9. PurchaseOrders

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "poNumber": String,
  "vendorId": ObjectId,  // Reference to Vendors
  "warehouseId": ObjectId,  // Reference to Warehouses
  "orderDate": Date,
  "expectedDeliveryDate": Date,
  "status": String,  // Draft, Submitted, Approved, Received, Cancelled
  "items": [
    {
      "productId": ObjectId,  // Reference to Products
      "quantity": Number,
      "unitCost": Number,
      "totalCost": Number,
      "receivedQuantity": Number,
      "status": String  // Pending, Partial, Complete
    }
  ],
  "subtotal": Number,
  "taxAmount": Number,
  "shippingCost": Number,
  "totalAmount": Number,
  "paymentTerms": String,
  "paymentStatus": String,  // Unpaid, Partial, Paid
  "notes": String,
  "createdBy": ObjectId,  // Reference to Users
  "approvedBy": ObjectId,  // Reference to Users
  "createdAt": Date,
  "updatedAt": Date
}
```

### 10. InventoryTransactions

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "transactionType": String,  // Receive, Issue, Transfer, Adjust, Count
  "referenceType": String,  // PO, SO, Transfer, Adjustment, Count
  "referenceId": ObjectId,  // Reference to related document
  "productId": ObjectId,  // Reference to Products
  "fromWarehouseId": ObjectId,  // Reference to Warehouses
  "fromLocationId": ObjectId,  // Reference to Locations
  "toWarehouseId": ObjectId,  // Reference to Warehouses
  "toLocationId": ObjectId,  // Reference to Locations
  "quantity": Number,
  "unitCost": Number,
  "totalCost": Number,
  "batchId": String,
  "serialNumbers": [String],
  "reason": String,
  "notes": String,
  "performedBy": ObjectId,  // Reference to Users
  "transactionDate": Date,
  "createdAt": Date
}
```

### 11. SalesOrders

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "orderNumber": String,
  "customerId": ObjectId,  // Reference to Customers
  "warehouseId": ObjectId,  // Reference to Warehouses
  "orderDate": Date,
  "promisedDeliveryDate": Date,
  "actualDeliveryDate": Date,
  "status": String,  // Draft, Confirmed, Picked, Packed, Shipped, Delivered, Cancelled
  "items": [
    {
      "productId": ObjectId,  // Reference to Products
      "quantity": Number,
      "unitPrice": Number,
      "discount": Number,
      "tax": Number,
      "totalPrice": Number,
      "pickedQuantity": Number,
      "shippedQuantity": Number,
      "status": String  // Pending, Partial, Complete
    }
  ],
  "subtotal": Number,
  "discountAmount": Number,
  "taxAmount": Number,
  "shippingCost": Number,
  "totalAmount": Number,
  "paymentMethod": String,
  "paymentStatus": String,  // Unpaid, Partial, Paid
  "shippingMethod": String,
  "trackingNumber": String,
  "notes": String,
  "createdBy": ObjectId,  // Reference to Users
  "createdAt": Date,
  "updatedAt": Date
}
```

### 12. Customers

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "type": String,  // Individual, Business
  "name": String,
  "contactPerson": String,
  "email": String,
  "phone": String,
  "address": {
    "billing": {
      "street": String,
      "city": String,
      "state": String,
      "country": String,
      "postalCode": String
    },
    "shipping": {
      "street": String,
      "city": String,
      "state": String,
      "country": String,
      "postalCode": String
    }
  },
  "taxId": String,
  "paymentTerms": String,
  "creditLimit": Number,
  "customerGroup": String,
  "notes": String,
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 13. InventoryCounts

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "countNumber": String,
  "warehouseId": ObjectId,  // Reference to Warehouses
  "status": String,  // Planned, In Progress, Completed, Cancelled
  "countType": String,  // Cycle Count, Full Inventory
  "startDate": Date,
  "endDate": Date,
  "items": [
    {
      "productId": ObjectId,  // Reference to Products
      "locationId": ObjectId,  // Reference to Locations
      "expectedQuantity": Number,
      "countedQuantity": Number,
      "discrepancy": Number,
      "notes": String,
      "countedBy": ObjectId,  // Reference to Users
      "countedAt": Date,
      "status": String  // Pending, Counted, Adjusted
    }
  ],
  "createdBy": ObjectId,  // Reference to Users
  "approvedBy": ObjectId,  // Reference to Users
  "createdAt": Date,
  "updatedAt": Date
}
```

### 14. Audits

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "entityType": String,  // Product, Inventory, PO, SO, etc.
  "entityId": ObjectId,
  "action": String,  // Create, Update, Delete
  "changes": {
    "field": String,
    "oldValue": Mixed,
    "newValue": Mixed
  },
  "performedBy": ObjectId,  // Reference to Users
  "performedAt": Date,
  "ipAddress": String
}
```

### 15. Reports

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "name": String,
  "type": String,  // Inventory Value, Stock Status, Purchase Analysis, etc.
  "parameters": {
    "startDate": Date,
    "endDate": Date,
    "warehouseIds": [ObjectId],
    "categoryIds": [ObjectId],
    "productIds": [ObjectId]
  },
  "format": String,  // PDF, Excel, CSV
  "generatedBy": ObjectId,  // Reference to Users
  "generatedAt": Date,
  "fileUrl": String,  // URL or GridFS reference
  "status": String  // Pending, Generated, Failed
}
```

### 16. Integrations

```json
{
  "_id": ObjectId,
  "organizationId": ObjectId,  // Reference to Organizations
  "name": String,
  "integrationType": String,  // ERP, E-commerce, Accounting, etc.
  "provider": String,  // SAP, Shopify, QuickBooks, etc.
  "credentials": {
    "apiKey": String,  // Encrypted
    "apiSecret": String,  // Encrypted
    "endpoint": String
  },
  "mappings": {
    "products": {
      "enabled": Boolean,
      "lastSync": Date,
      "syncDirection": String  // Import, Export, Bidirectional
    },
    "inventory": {
      "enabled": Boolean,
      "lastSync": Date,
      "syncDirection": String
    },
    "orders": {
      "enabled": Boolean,
      "lastSync": Date,
      "syncDirection": String
    }
  },
  "status": String,  // Active, Inactive, Error
  "lastSyncStatus": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

## Indexes

For optimal query performance, create the following indexes:

1. Organizations:

   - `name` (text index for search)
   - `isActive` (for filtering active organizations)

2. Users:

   - `organizationId` (for filtering by organization)
   - `email` (unique)
   - `role` (for filtering by role)

3. Products:

   - `organizationId` (for filtering by organization)
   - `sku` (unique within organization)
   - `barcode` (for scanning)
   - `name` (text index for search)
   - `categoryId` (for filtering by category)
   - Compound index: `{organizationId: 1, status: 1}` (for listing active products)

4. Inventory:

   - Compound index: `{organizationId: 1, productId: 1, warehouseId: 1, locationId: 1}` (unique)
   - Compound index: `{organizationId: 1, warehouseId: 1, status: 1}` (for filtering low stock)

5. Locations:

   - Compound index: `{organizationId: 1, warehouseId: 1, code: 1}` (unique)

6. PurchaseOrders:

   - `organizationId` (for filtering by organization)
   - `poNumber` (unique within organization)
   - `vendorId` (for filtering by vendor)
   - `status` (for filtering by status)
   - Compound index: `{organizationId: 1, orderDate: -1}` (for listing recent orders)

7. SalesOrders:

   - `organizationId` (for filtering by organization)
   - `orderNumber` (unique within organization)
   - `customerId` (for filtering by customer)
   - `status` (for filtering by status)
   - Compound index: `{organizationId: 1, orderDate: -1}` (for listing recent orders)

8. InventoryTransactions:
   - `organizationId` (for filtering by organization)
   - `productId` (for product history)
   - `transactionType` (for filtering by type)
   - Compound index: `{organizationId: 1, transactionDate: -1}` (for listing recent transactions)

## Multi-Tenant Considerations

This model is designed for a multi-tenant SaaS application:

1. Every collection includes an `organizationId` field to segregate data by tenant.
2. Indexes are created on `organizationId` to ensure efficient querying.
3. Application code should always include the organization context in queries.
4. Consider using MongoDB Atlas with collection-level access control for enhanced security.

## Schema Validation

For each collection, implement MongoDB schema validation to enforce data integrity:

```javascript
db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['organizationId', 'sku', 'name'],
      properties: {
        organizationId: { bsonType: 'objectId' },
        sku: { bsonType: 'string' },
        name: { bsonType: 'string' },
        // Additional validation rules
      },
    },
  },
});
```

## Relationships Implementation

Although MongoDB is a NoSQL database, this model maintains proper relationships:

1. **One-to-Many relationships** (e.g., Organization to Products):

   - Store the parent document's ObjectId in the child document.
   - Example: `organizationId` in Products collection.

2. **Many-to-Many relationships** (e.g., Products to Warehouses):

   - Implemented through the Inventory collection which maintains both `productId` and `warehouseId`.

3. **Hierarchical relationships** (e.g., Category hierarchy):

   - Self-references with `parentCategoryId`.

4. **Embedded documents** for related data that is always accessed together (e.g., address information).

5. **Document references** for related data that changes frequently or is accessed independently.

## Data Migration and Seeding

When setting up a new tenant:

1. Create the organization document first.
2. Seed standard data such as default user roles and product categories.
3. Implement logic to generate unique IDs for elements like SKUs, order numbers, etc.
4. Create appropriate indexes for the new tenant's data.
