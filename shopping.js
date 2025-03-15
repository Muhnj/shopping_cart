
        let cart = [];

        function addToCart(id, name, price) {
            let existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            updateCart();
        }

        function updateCart() {
            const cartContainer = document.querySelector(".cart");
            cartContainer.innerHTML = "";
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <p>${item.name} - $${item.price} x ${item.quantity}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
            document.getElementById("total").textContent = total;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function showCheckout() {
            document.querySelector(".checkout").style.display = "block";
        }

        function validateCheckout() {
            let name = document.getElementById("name").value;
            let address = document.getElementById("address").value;
            if (name.trim() === "" || address.trim() === "") {
                alert("Please fill in all fields.");
                return false;
            }
            alert("Order placed successfully!");
            return true;
        }
