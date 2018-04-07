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
                text: 'dal po ebaly na ' + damage
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
                text: 'dal bolno po ebaly na ' + damage
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
                    text: 'podlechils9 na 10'
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
                text: 'polychil po ebaly na ' + damage
            })
        },
        giveUp: function() {
            this.gameIsRunning = false;
            alert('Mdaaaa');
        },
        calculatetDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        checkWin: function() {
            if (this.playerHealth <= 0) {
                if (confirm('- 25, g next?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.monsterHealth <= 0) {
                if (confirm('ez katka, go next ?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true
            }
            return false;
        },
    }

})