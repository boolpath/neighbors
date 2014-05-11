/** MODULE INTERFACE
 *@method {function} - 
 */
module.exports = {
    create: {
        neighborhood: createNeighborhood 
    }
};

/*----------------------------------------------------------------------------*/

/** 
 * @param {object} axes - An array containing the coordinate axes of the multidimensional neighborhood model
 * @returns {object} neighborhood - 
 */
function createNeighborhood(axes) {
    var neighborhood = Object.create({}, {
        axes: {
            enumerable: true,
            value: []
        }
    });

    // Parameter validation
    if (!(axes instanceof Array)) {
        return neighborhood;
    }

    // Multidimensional space generation
    for (var index in axes) {
        var axis = axes[index];
        if (typeof axis === 'string') {
            neighborhood.axes.push(axis);
        }
    }
    neighborhood.dimension = neighborhood.axes.length;

  return neighborhood;
}