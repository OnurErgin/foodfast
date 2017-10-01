/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sample transaction processor function.
 * @param {org.foodfast.reputation.FoodTransaction} tx The sample transaction instance.
 * @transaction
 */
function sampleTransaction(tx) {

    // Update the asset with the new value.
  
   if (tx.order.deliveryStatus == 'DELIVERED')
     	return;
  
    tx.order.deliveryTime = tx.deliveryTime;
    tx.order.deliveryStatus = tx.deliveryStatus;

    // Get the asset registry for the asset.
    return getAssetRegistry('org.foodfast.reputation.FoodOrder')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.order);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.foodfast.reputation', 'FoodEvent');
            event.order = tx.order;
            event.t_deliveryStatus = tx.deliveryStatus;
            event.t_deliveryTime = tx.deliveryTime;
            emit(event);

        });

}

