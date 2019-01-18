import {merge} from 'lodash';
class positionData {
  constructor(stone, pos, initialize = true) {
    this.stone = stone;
    this.pos = pos;
    this.groupSize = 0;
    this.groupLiberties = initialize ? this.initializeGroupLiberties() : {};
    this.groupPositions = {[pos]: true};
    this.parentPiece = this;
  }

  rootPiece() {
    // Traverse up abstract tree structure until reach root positionData object
    let piece = this;
    while(piece.parentPiece !== piece) {
      piece = piece.parentPiece;
    }

    return piece;
  }

  connectPiece(otherPiece) {
    let parentRoot;
    let childRoot;
    // return if pieces are already connected
    if (otherPiece.rootPiece().pos === this.rootPiece().pos) return;
    // for efficiency, we append the smaller group to the larger group
    // this is an attempt to keep the group tree representations 'flatter'
    if (otherPiece.rootPiece().groupSize >= this.rootPiece().groupSize) {
      parentRoot = otherPiece.rootPiece();
      childRoot = this.rootPiece();
    } else {
      parentRoot = this.rootPiece();
      childRoot = otherPiece.rootPiece();
    }

    // update group size
    parentRoot.groupSize += childRoot.groupSize;
    // merge liberty and position hashes
    parentRoot.groupLiberties = merge(parentRoot.groupLiberties, childRoot.groupLiberties);
    parentRoot.groupPositions = merge(parentRoot.groupPositions, childRoot.groupPositions);
    // finally append group trees, connecting them together
    childRoot.parentPiece = parentRoot;
  }

  adjacentPositions() {
    // return array of all valid adjacent positions
    const adjacent = [];
    const i = parseInt(this.pos[0]);
    const j = parseInt(this.pos[1]);

    if (i > 0) adjacent.push(`${i - 1}${j}`);
    if (i < 8) adjacent.push(`${i + 1}${j}`);
    if (j > 0) adjacent.push(`${i}${j - 1}`);
    if (j < 8) adjacent.push(`${i}${j + 1}`);

    return adjacent;
  }

  initializeGroupLiberties() {
    // return hashmap of all valid adjacent positions
    const liberties = {};
    const i = parseInt(this.pos[0]);
    const j = parseInt(this.pos[1]);

    if (i > 0) liberties[`${i - 1}${j}`] = true;
    if (i < 8) liberties[`${i + 1}${j}`] = true;
    if (j > 0) liberties[`${i}${j - 1}`] = true;
    if (j < 8) liberties[`${i}${j + 1}`] = true;

    return liberties;
  }

  static removeGroupfromRoot(board, root) {
    // Check that group is indeed completely surrounded
    if (Object.keys(root.groupLiberties).length > 0) return;
    // Create array of all group positions to iterate over
    let groupPos = Object.keys(root.groupPositions);

    groupPos.forEach((pos) => {
      // create new data object (empty position) and place it on board
      let newPiece = new positionData(null, pos, false);
      board[pos] = newPiece;
    });

    groupPos.forEach((pos) => {
      // Restore liberty to all adjacent positions (both empty, ally and opponent)
      board[pos].adjacentPositions().forEach((adjacentPos) => {
        let otherPiece = board[adjacentPos];
        otherPiece.rootPiece().groupLiberties[pos] = true;
      });
    });
  }
  //
}

export default positionData;
