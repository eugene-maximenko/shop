const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'nok',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {

    node.textContent = toCurrency(node.textContent)

})

const $cart = document.querySelector('#cart')

if ($cart) {
    $cart.addEventListener('click', event => {

        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/cart/remove/' + id, { method: 'delete' }).
                then(res => res.json()).
                then(cart => {


                    if (cart.courses.length) {
                        const html = cart.courses.map(c => {
                            return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${c.id}">Remove</button>
                                </td>
                            </tr>
                            `
                        }).join()

                        $cart.querySelector('tbody').innerHTML = html
                        $cart.querySelector('.price').textContent = toCurrency(cart.price)

                    } else {
                        $cart.innerHTML = `<p>Cart is empty</p>`
                    }

                })
        }

    })
}