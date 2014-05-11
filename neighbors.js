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
    if (neighborhood.axes.length < 1) return;
    // Space dimension
    neighborhood.dimension = neighborhood.axes.length;

    // Neighborhood relationships
    var numNeighbors = Math.pow(3, neighborhood.dimension) - 1,
        positions = ['l', 'm', 'h'],
        axes = neighborhood.axes,
        axesLength = axes.length;
    (function createRelation(neighbor) {
        var neighborKey = axes[0] + positions[(neighbor % Math.pow(3, 1))];
        if (axes[1]) {
            (function createAxis(axis) {
                var positionIndex = Math.floor((neighbor % Math.pow(3, axis + 1)) / Math.pow(3, axis));
                neighborKey += '-' + axes[axis] + positions[positionIndex];
                if (++axis < axesLength) {
                    createAxis(axis);
                }
            })(1);
        }
        Object.defineProperty(neighborhood.neighbors, neighborKey, {
            enumerable: true,
            value: {}
        });

        if (++neighbor <= numNeighbors) {
            createRelation(neighbor);
        }
    })(0);

    return neighborhood;
}