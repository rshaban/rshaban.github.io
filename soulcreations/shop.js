// // Fetch and display items from MongoDB
// function fetchItems() {
//   fetch('/api/items')
//     .then(response => response.json())
//     .then(items => {
//       const itemsContainer = document.getElementById('itemsContainer');
//       itemsContainer.innerHTML = ''; // Clear previous items
//       items.forEach(item => {
//         const itemElement = document.createElement('div');

        
//         itemElement.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p>`;
//         itemsContainer.appendChild(itemElement);
      
      
//       });
//     })
//     .catch(error => console.error('Error fetching items:', error));
// }

function fetchStripeListings() {
  fetch('/api/stripeListings')
    .then(response => response.json())
    .then(items => {
      console.log(items);
      const itemsContainer = document.getElementById('itemsContainer');
      itemsContainer.innerHTML = ''; // Clear previous items
      items.forEach(item => {
        const itemElement = document.createElement('div');
        // in shopLink: make button, do 
        itemElement.innerHTML = `
        <img src="${item.images[0]}"/>
        <div class="shopTileDetails">
          Name: ${item.name}<br/><br/>
          Favoite food: ${item.metadata["food"]}<br/><br/>
          ${item.metadata["fact"]}
        </div>
        <div class="shopLink">
          Add to cart
        </div>
        <div class="shopOverlay"></div>
        <!-- ${item.id} ${item.default_price} ; modal on click-->
        `;
        itemElement.classList.add("shopTile", "mx-auto", "ratio", "ratio-1x1");

        const itemElementParent = document.createElement('div');
        itemElementParent.classList.add("col-9", "col-md-5", "col-lg-3", "p-2");
        itemElementParent.appendChild(itemElement);
        
        itemsContainer.appendChild(itemElementParent);
      });
    })
    .catch(error => console.error('Error fetching items:', error));
}


// Add a new item to MongoDB
// document.getElementById('itemForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const name = document.getElementById('name').value;
//   const description = document.getElementById('description').value;

//   fetch('/api/items', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, description })
//   })
//   .then(response => {
//     if (response.ok) {
//       fetchItems(); // Refresh the list of items
//       document.getElementById('name').value = '';
//       document.getElementById('description').value = '';
//     } else {
//       alert('Error adding item');
//     }
//   })
//   .catch(error => console.error('Error adding item:', error));
// });

// Initial fetch of items
// fetchItems();
fetchStripeListings();



// Initialize Stripe.js
const stripe = Stripe('');
initialize();

// Fetch Checkout Session and retrieve the client secret
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Initialize Checkout
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  // checkout.mount('#checkout');
}

const fetchSessionStatus = async (session_id) => {
  const session = await fetch(`/session_status?session_id=${session_id}`)
  if (session.status == 'open') {
    // Remount embedded Checkout
  } else if (session.status == 'complete') {
    // Show success page
    // Optionally use session.payment_status or session.customer_email
    // to customize the success page
  }  
}