
document.addEventListener("DOMContentLoaded", function () {

  function $id(id) { return document.getElementById(id); }

  function initDiscount() {
    const btn = $id("discount-btn");
    const result = $id("discount-result");
    const input = $id("discount-code"); // a field in the form 

    if (!btn || !result || !input) {
      console.warn("Discount elements missing - check IDs: discount-btn, discount-result, discount-code");
      return;
    }

    btn.addEventListener("click", function () {
      const percent = Math.floor(Math.random() * 11) + 5; 
      const code = "MASAR-" + percent;
      result.textContent = `Your discount code is: ${code}`;
      input.value = code; 
    });
  }


// -------------------calculator--------------------------
  function calculatePrice() {
    const ticketSelect = $id("ticket-type-calc");
    const ticketPrice = Number(ticketSelect ? ticketSelect.value : 0);

    const workshops = document.querySelectorAll(".calc-workshop:checked");
    const numWorkshops = workshops.length;


    const subtotal = ticketPrice * numWorkshops;

    // read discount code from form input (not the discount-result)
    const discountCodeInput = $id("discount-code");
    let discountPercent = 0;
    if (discountCodeInput) {
      const val = discountCodeInput.value.trim();
      if (val.startsWith("MASAR-")) {
        const parts = val.split("-");
        const maybe = Number(parts[1]);
        if (!isNaN(maybe) && maybe >= 5 && maybe <= 15) {
          discountPercent = maybe;
        }
      }
    }

    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    // update UI (if elements exist)
    if ($id("calc-subtotal")) $id("calc-subtotal").textContent = subtotal.toFixed(2);
    if ($id("calc-discount")) $id("calc-discount").textContent = discountAmount.toFixed(2);
    if ($id("calc-total")) $id("calc-total").textContent = total.toFixed(2);
  }

  function initCalculator() {
    const calcBtn = $id("calc-btn");
    if (!calcBtn) {
      console.warn("Calculator button calc-btn missing");
      return;
    }
    calcBtn.addEventListener("click", function (e) {
      calculatePrice();
    });
  }


  // -------------------registration handler--------------------------
  function initRegisterHandler() {
    const form = $id("registration-form");
    if (!form) {
      console.warn("registration-form not found");
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = ($id("name") ? $id("name").value.trim() : "");
      const email = ($id("email") ? $id("email").value.trim() : "");
      const ticket = ($id("ticket-type") ? $id("ticket-type").value.trim() : "");

      // require these three fields to be non-empty
      if (name === "" || email === "" || ticket === "") {
        return;
      }

      // show transient message
      showTransientMessage("Thank you for registering!", 2000);
    });
  }

  // small reusable function to show a bottom-right message
  function showTransientMessage(text, ms) {
    const box = document.createElement("div");
    box.textContent = text;

    box.style.position = "fixed";
    box.style.bottom = "20px";
    box.style.right = "20px";

    box.style.background = "#2c3e59";
    box.style.color = "#fff";
    box.style.padding = "12px 16px";
    box.style.borderRadius = "8px";
    box.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)";

    box.style.opacity = "0";
    box.style.transition = "opacity 0.2s ease";
    box.style.zIndex = "9999";

    document.body.appendChild(box); // add to DOM

    //  fade in
    requestAnimationFrame(() => { box.style.opacity = "1"; });

    // fade out and remove after ms milliseconds
    setTimeout(() => {
      box.style.opacity = "0";
      setTimeout(() => box.remove(), 220);
    }, ms);
  }

  // call FUNNCTIONS
  initDiscount();
  initCalculator();
  initRegisterHandler();

}); // DOMContentLoaded
