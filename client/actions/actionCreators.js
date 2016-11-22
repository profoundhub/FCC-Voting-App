// ++
export function increment( index ) {
  return {
    type: 'INCREMENT_VOTES',
    index
  }
}

// + comment
export function addComment( postId, author, comment ) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}

// - comment

export function removeComment( postId, i ) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}
