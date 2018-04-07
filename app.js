new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function() {


            var damage = this.calculatetDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'punch on ' + damage + ' damage'
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack(5, 12)
        },

        specialAttack: function() {
            var damage = this.calculatetDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'made critical strike on ' + damage + " damage"
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack(12, 22)


        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'healing on 10'
                })
            } else {
                this.playerHealth = 100;

            }
            this.monsterAttack(7, 13);

        },
        monsterAttack: function(min, max) {

            var damage = this.calculatetDamage(min, max);;
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Lose ' + damage + ' hp'
            })
        },
        giveUp: function() {
            this.gameIsRunning = false;
            alert('Come back and try again');
        },
        calculatetDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        checkWin: function() {
            if (this.playerHealth <= 0) {
                if (confirm('You lose. Try again ?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 100;
                    this.playerHealth = 100;
                    this.turns = [];
                    
                }
                return true;
            } else if (this.monsterHealth <= 0) {
                if (confirm('You won, go next')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 100;
                    this.playerHealth = 100;
                    this.turns = [];
                }
                return true
            }
            return false;
        },
    }

})