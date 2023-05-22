export function spaceHeader(space_id) {
  return {
    context: {
      headers: {
        space: space_id,
      },
    },
  };
}
