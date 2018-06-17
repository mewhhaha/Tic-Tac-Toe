/**
 * Created by Magda on 2018-06-17.
 */

function transpose(m) { 
    return m[0].map((x,i) => m.map(x => x[i])); 
}

function all(m) {
    return x => m.every(y => y == x);    
}

function diagonal(square){
    var array = [];
    for(let i = 0; i < square.length * square.length; i += (square.length + 1)){
    	array.push(square[Math.floor(i / square.length)][i % square.length]);
    }
    return array;
}

/*	
 * 	[	
 * 		[field-00,field-01,field-02]
 *		[field-10,field-11,field-12]
 *		[field-20,field-21,field-22]
 *	]
 */

//function 1: render board initially = render 9 divs
//function 2: update board when a player makes a move. Update one div by adding 'X' or 'O' to HTML

/*
  var field;
  var board;
  
  for (i=0; i<9; i++) {
  field = document.createElement("div");
  field.className = "field";

  board = document.getElementById("board");
  board.appendChild(field);
  } 
  
*/



function init(size) {
    var board, field;
    
    board = document.getElementById("board");
    
    for (let i = 0; i < size; i++) {
	let row = document.createElement("span");
	row.className = "row";
	for (let j = 0; j < size; j++) {
      	    field = document.createElement("div");
      	    field.className = "field";
            field.id = i + "," +j;
            row.appendChild(field);
	}
	board.appendChild(row);
    }
}

function validate(board) {  
    return validateRows(board) || validateColumns(board) || validateDiagonals(board);
}

function validateRows(board){
    for(let i = 0; i < board.length; i++) {
	let row = board[i];
    	if (all(row)('X') || all(row)('O'))
       	    return true;
    }
    
    return false;
}

function validateColumns(board){
    var transBoard;
    
    transBoard = transpose(board);
    for(let i = 0; i < board.length; i++) {
	let column = transBoard[i];
    	if (all(column)('X') || all(column)('O'))
       	    return true;
    }
    
    return false;
}

function validateDiagonals(board){
    var diagBoard, diagRevBoard;
    
    diagBoard = diagonal(board);
    diagRevBoard = diagonal(transpose(board).map(x => x.reverse()));
    return all(diagBoard)('X') || 
	all(diagBoard)('O') || 
	all(diagRevBoard)('X') || 
	all(diagRevBoard)('O');
}
