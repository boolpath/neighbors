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
        dimension: {
            writable: true,
            enumerable: true,
            value: 0
        },
        axes: {
            enumerable: true,
            value: []
        },
        neighbors: {
            enumerable: true,
            value: {}
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
    // Space dimension
    neighborhood.dimension = neighborhood.axes.length;

    // Neighborhood relationships
    var numNeighbors = Math.pow(3, neighborhood.dimension) - 1;

  return neighborhood;
}