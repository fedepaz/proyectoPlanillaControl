export async function validateReference(model, id) {
  const result = await model.findById(id);
  if (!result) {
    const error = new Error(`${model.modelName} with id ${id} not found`);
    error.status = 404;
    error.name = `NotFound`;
    throw error;
  }
}
