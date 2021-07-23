const toggleForm = () => {
  const login_swipe = document.querySelector('.login_swipe');
  login_swipe.classList.toggle('active');
  };

const cartcounter = document.querySelector("#cartcounter")
const addToCart = document.querySelectorAll('.add-to-cart')
const removeproduct = document.querySelectorAll('.tp-remove')

  function updateCart(data) {
    axios.post('/update-cart',data).then(res => {
      console.log(res.data.totalQty)
      cartcounter.innerText = res.data.totalQty
      new Noty({
        type: "success",
        timeout : 1000,
        progressBar: false,
        text: "Product Added to Cart"
      }).show();
    })
    .catch(err=> {
      new Noty({
        type: "error",
        timeout : 1000,
        progressBar: false,
        text: "Something went wrong"
      }).show();
    })
  }

  addToCart.forEach((cartbtn)=> {
    cartbtn.addEventListener('click', ()=> {
      const data = JSON.parse(cartbtn.dataset.product) 
      updateCart(data)
    })
  })

  function deleteCart(data) {
    axios.post('/delete-cart',data).then(res => {
      location.reload();
      cartcounter.innerText = res.data.totalQty
      new Noty({
        type: "error",
        timeout : 1000,
        progressBar: false,
        text: "Product Removed from Cart"
      }).show();

      
    })
    .catch(err=> {
      new Noty({
        type: "error",
        timeout : 1000,
        progressBar: false,
        text: "Something went wrong"
      }).show();
    })
  }

  removeproduct.forEach((removepr)=> {
    removepr.addEventListener('click', ()=> {
      const data = JSON.parse(removepr.dataset.product) 
      console.log(data)
      deleteCart(data)
    })
  })