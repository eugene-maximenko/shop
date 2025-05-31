document.querySelectorAll('.price').forEach(node => {

    node.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'nok',
        style: 'currency'
    }).format(node.textContent)

})