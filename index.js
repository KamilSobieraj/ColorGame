var ColorGame = (function(){
    var numberOfTiles = 6;
    var colors = [];
    var colorToGuess;
    var mainTagHeight = document.querySelector('main');
    var tiles = document.querySelectorAll('.tile');
    var colorToGuessDisplay = document.getElementById('color-to-guess');
    var displayMessage = document.querySelector('#result-message');
    var headerDisplay = document.querySelector('header');
    var resetColorsButton = document.querySelector('#reset-colors');
    var modeButtons = document.querySelectorAll('.mode-button');
    const headerColor = 'steelblue';
    const backgrColor = '#232323';

    var init = function() {
        modeButtonsSetter();
        tilesAction();
        reset();
    }

    var modeButtonsSetter = function() {
        //mode buttons listeners
        for (let i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener('click', function() {
                modeButtons[0].classList.remove('nav__selected');
                modeButtons[1].classList.remove('nav__selected');
                this.classList.add('nav__selected')
                if (this.textContent === 'EASY') {
                    numberOfTiles = 3;
                    mainTagHeight.style.height = '200px';

                }
                else{
                    numberOfTiles = 6;    
                    mainTagHeight.style.height = '400px';
                }
                reset();
            })
        }
    }

    var tilesAction = function(){
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

    var reset = function() {
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
    var pickColor = function() {
        let random = Math.floor(Math.random() * colors.length);
        return colors[random];    
    }

    //Generate a new colors set
    var generateColorsSet = function(numOfColors) {
        var colorArray = [];
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

    //Changing colors after win
    var changeColors = function(color) {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.backgroundColor = color;        
        }
    }

    //Generate a single color for an array
    var generateRandomColor = function() {
        let red = Math.floor(Math.random() * 256);    
        let green = Math.floor(Math.random() * 256);    
        let blue = Math.floor(Math.random() * 256);    
        return `rgb(${red}, ${green}, ${blue})`;
    }


    return {
        init: init
    }
})();

ColorGame.init();