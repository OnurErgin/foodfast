# FoodFast Basic Business Network
###### (Developed in Composer)

> When ordering food online, punctuality is a big part of the experience. You don't want your meetings get interrupted because of a late arriving food order. The customers of online food ordering portals can now see the "promised delivery times" and the "actual delivery times" of the restaurants, along with the experience-based user ratings.

* Entrepreneurs can offer services to the slow-delivering restaurants
* Customers can have a better understanding of when their food will arrive: better satisfaction
* Encourages restaurants to plan better. New restaurants will have more chances of competing with older, bigger restaurants
* Paid ratings will be less misleading

This business network defines:

**Participant**
`Restaurant`

**Asset**
`FoodOrder`

**Transaction**
`FoodTransaction`

**Event**
`FoodEvent`

FoodOrders are created by a Restaurant, and the value property on a FoodOrder can be modified by submitting a FoodTransaction. The FoodTransaction emits a FoodEvent that notifies applications of the old and new values for each modified FoodOrders.

To test this Business Network Definition in the **Test** tab:

Create a `Restaurant` participant:

```
{
  "$class": "org.foodfast.reputation.Restaurant",
  "restaurantId": "restaurantId:0001",
  "restaurantName": "Tisch&Tschips"
}
```

Create a `FoodOrder` asset:

```
{
  "$class": "org.foodfast.reputation.FoodOrder",
  "orderId": "orderId:1001",
  "owner": "resource:org.foodfast.reputation.Restaurant#restaurantId:0001",
  "orderTime": 40,
  "deliveryTime": -1,
  "deliveryStatus": "RECEIVED"
}
```

Submit a `FoodTransaction` transaction:

```
{
  "$class": "org.foodfast.reputation.FoodTransaction",
  "order": "resource:org.foodfast.reputation.FoodOrder#orderId:1001",
  "deliveryTime": 35,
  "deliveryStatus": "DELIVERED"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `FoodEvent` has been emitted. As a result, the value of the `orderId:1001` should now be `deliveryTime = 35` in the Asset Registry.

Onur Ergin

