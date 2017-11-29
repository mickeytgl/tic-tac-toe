const vm = new Vue({
	el: '#app',
	data: {
		message: 'Hello!',
		started: false,
		turn: 'X',

		game: {
			over: false,
			winner: '',
			draw: false,
		},

		board: [
		  [{val: '', bg: ''}, {val: '', bg: ''}, {val: '', bg: ''}],
		  [{val: '', bg: ''}, {val: '', bg: ''}, {val: '', bg: ''}],
		  [{val: '', bg: ''}, {val: '', bg: ''}, {val: '', bg: ''}]
		],

		winCombos: [
      	  [[0,0],[0,1],[0,2]],
      	  [[1,0],[1,1],[1,2]],
      	  [[2,0],[2,1],[2,2]],
      	  [[0,0],[1,0],[2,0]],
      	  [[0,1],[1,1],[2,1]],
      	  [[0,2],[1,2],[2,2]],
      	  [[0,0],[1,1],[2,2]],
      	  [[2,0],[1,1],[0,2]]
		]
	},

	computed: {
		array() {
			return this.board.map( x => x.map( y => y.val));
		},

		winArray() {
			return this.winCombos.map( x => x.map( y => this.board[y[0]][y[1]].val));
		},

		check() {
			const board = this.array;
			const winCombos = this.winArray;
			const draw = this.array.every( x =>( y => y != ''));

			const checkWin = winCombos.forEach((x,index) => {
				const vector = this.winCombos[index];
				let over = false;

				if(x.every(y => y == 'X')){
					this.game.winner = 'X';
					over = true;
				}

				if(x.every(y => y == 'O')){
					this.game.winner = 'O';
					over = true;
				}

				if(over){
					this.run = false;
					this.setWin(vector);
				}
			})
		}
	}, //Computed

	methods: {
		init() {
			this.reset();
			this.start();
		},

		start() {
			this.run = true;
			this.started = true;
		},

		reset() {
			this.run = false;
			this.game.over = false;
			this.game.winner = '';
			this.game.draw = false;

			this.board.forEach(x => {
				x.map(y => {y.val = ''; y.bg = ''})
			})
		},

		router(box){
			this.mark(box);
		},

		mark(box){
			const run = this.run;

			if(box.val == '' && run){
				box.val = this.turn;
				this.turn = this.turn == 'X' ? 'O' : 'X';
				this.check;
			}
		},

		setWin(vector){
			if(!this.game.draw){
				vector.forEach( x => {
					this.board[x[0]][x[1]].bg = 'active'
				})
			}

			setTimeout(() => {
				this.game.over = true;
			}, 750)
		}
	}// Methods
});