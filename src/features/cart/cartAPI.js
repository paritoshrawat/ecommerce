export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}

// export function resetCart(userId) {
//   // get all items of user's cart - and then delete each
//   return new Promise(async (resolve) => {
//     const response = await fetchItemsByUserId(userId);
//     const items = response.data;
//     for (let item of items) {
//       await deleteItemFromCart(item.id);
//     }
//     resolve({status:'success'})
//   });
// }

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    // Fetch items for the user
    const response = await fetchItemsByUserId(userId);
    const items = response.data; // Access 'data' property

    // Check if items is an array
    if (Array.isArray(items)) {
      // Iterate over items and delete each one
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: "success" });
    } else {
      // Handle case where items is not an array (e.g., handle error)
      resolve({ status: "error", message: "Unable to fetch cart items" });
    }
  });
}
