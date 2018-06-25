var ColorGame = (function(){
    let numberOfTiles = 6;
    let colors = [];
    let colorToGuess;
    let mainTagHeight = document.querySelector('main');
    let tiles = document.querySelectorAll('.tile');
    let colorToGuessDisplay = document.querySelector('#color-to-guess');
    let displayMessage = document.querySelector('.result-message');
    let headerDisplay = document.querySelector('header');
    let resetColorsButton = document.querySelector('#reset-colors');
    let modeButtons = document.querySelectorAll('.nav-bar__mode-button');
    const headerColor = 'steelblue';
    const backgrColor = '#232323';

    const init = () => {
        modeButtonsSetter();
        tilesAction();
        reset();
    }

    const modeButtonsSetter = () => {
        //mode buttons listeners
        for (let i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener('click', function() {
                modeButtons[0].classList.remove('nav-bar__selected');
                modeButtons[1].classList.remove('nav-bar__selected');
                this.classList.add('nav-bar__selected')
                if (this.textContent === 'EASY') {
                    numberOfTiles = 3;
                    //mainTagHeight.style.height = '200px';

                }
                else{
                    numberOfTiles = 6;    
                    //mainTagHeight.style.height = '400px';
                }
                reset();
            })
        }
    }

    const tilesAction = () => {
        //Color tiles action
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', () => {
                var clickedColor = tiles[i].style.backgroundColor;
                console.log(clickedColor, colorToGuess);
                
                if (clickedColor === colorToGuess) {
                    displayMessage.textContent = 'Great!';
                    changeColors(colorToGuess);
                    headerDisplay.style.backgroundColor = colorToGuess;
                    resetColorsButton.textContent = 'Play again?';
                }
                else{
                    tiles[i].style.backgroundColor = backgrColor;
                    displayMessage.textContent = 'Nope - try again!'; //prepeare random messages to display each time another one
                    displayMessage.style.color = 'black';
                }            
            });
        }
    }

    const reset = () => {
        colors = generateColorsSet(numberOfTiles);
        colorToGuess = pickColor();
        colorToGuessDisplay.textContent = colorToGuess.toLocaleUpperCase();
        displayMessage.textContent = '';
        resetColorsButton.textContent = 'New colors set';
        //reset colors display
        for (let i = 0; i < tiles.length; i++) {
            if (colors[i]) {
                tiles[i].style.display = 'block';
                tiles[i].style.backgroundColor = colors[i];    
            }
            else{
                tiles[i].style.display = 'none';            }
            }
        headerDisplay.style.backgroundColor = headerColor;
        }

    //Picking color to guess
    const pickColor = () => {
        let random = Math.floor(Math.random() * colors.length);
        return colors[random];    
    }

    //Generate a new colors set
    const generateColorsSet = (numOfColors) => {
        let colorArray = [];
        for (let i = 0; i < numOfColors; i++) {
            colorArray.push(generateRandomColor());
        }
        return colorArray;
    }

    //Reset button (New Colors Set)
    resetColorsButton.addEventListener('click', () => {
        reset();
    });

    //Clicking tiles action
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', () => {
            let clickedColor = tiles[i].style.backgroundColor;
            console.log(clickedColor, colorToGuess);
            
            if (clickedColor === colorToGuess) {
                displayMessage.textContent = 'Great!';
                changeColors(colorToGuess);
                headerDisplay.style.backgroundColor = colorToGuess;
                resetColorsButton.textContent = 'Play again?';
            }
            else{
                tiles[i].style.backgroundColor = backgrColor;
                displayMessage.textContent = 'Nope - try again!'; //prepeare random messages to display each time another one
                displayMessage.style.color = 'black';
            }            
        });
    }

    //Changing colors after win
    const changeColors = (color) => {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.backgroundColor = color;        
        }
    }

    //Generate a single color for an array
    const generateRandomColor = () => {
        const red = Math.floor(Math.random() * 256);    
        const green = Math.floor(Math.random() * 256);    
        const blue = Math.floor(Math.random() * 256);    
        return `rgb(${red}, ${green}, ${blue})`;
    }


    return {
        init: init
    }
})();

ColorGame.init();