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
    let piece = this;
    while(piece.parentPiece !== piece) {
      piece = piece.parentPiece;
    }

    return piece;
  }

  connectPiece(otherPiece) {
    let parentRoot;
    let childRoot;
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
    if (Object.keys(root.groupLiberties).length > 0) return;
    
    let groupPos = Object.keys(root.groupPositions);

    groupPos.forEach((pos) => {
      let newPiece = new positionData(null, pos, false);
      board[pos] = newPiece;

      newPiece.adjacentPositions().forEach((adjPos) => {
        if (groupPos.includes(adjPos)) newPiece.groupLiberties[adjPos] = true;
      });
    });
  }
  //
}

export default positionData;
