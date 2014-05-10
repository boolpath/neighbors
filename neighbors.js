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
    var neighborhood = {
        axes: {}
    };

    // Parameter validation
    if (!(axes instanceof Array)) {
        return neighborhood;
    }

    // Multidimensional space generation
    var dimensions = 0;
    for (var index in axes) {
        var axis = axes[index];
        if (typeof axis === 'string') {
            dimensions++;
            Object.defineProperty(neighborhood.axes, axis, {
                enumerable: true,
                value: Object.create({}, {
                    lower: {
                        writable: true,
                        enumerable: true,
                        value: undefined
                    },
                    higher: {
                        writable: true,
                        enumerable: true,
                        value: undefined
                    }
                })
            });
        }
    }
    neighborhood.dimension = dimensions;

  return neighborhood;
}