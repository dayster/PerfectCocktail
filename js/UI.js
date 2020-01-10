class UI{

    displayWithIngredient(drinks){
        // Show Results
        const resultWrapper = document.querySelector('#results-wrapper');
        resultWrapper.style.display = 'block';

        const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <img class="card-img-top" src="" alt="">
                    </div>
                    <div class="card-body">
                        <div class="card-title text-center">
                            <p class="card-text font-weight-bold">Instruction</p>
                            <p class="card-text">

                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    printMessage(message, className){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}