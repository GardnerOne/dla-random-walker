let tree = [];
let walkers = [];
let stuck = false;
let steps = 300;
let numWalkers = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);

    tree.push(new Walker(width / 2, height / 2, true));

    for (let i = 0; i < numWalkers; i++) {
        walkers.push(new Walker());
    }

    stuck = false;
}

function draw() {
    background(dark);

    for (let leaf of tree) {
        leaf.render();
    }

    for (let walker of walkers) {
        walker.render();
    }

    for (let i = 0; i < steps; i++) {
        for (const [i, walker] of walkers.entries()) {
            walker.move();

            if (walker.isStuck(tree)) {
                tree.push(walker);
                // Remove the old walker
                walkers.splice(i, 1);
                // And add a new one
                // walkers.push(new Walker());
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
