function drawTrain(train) {
  const cars = train.split("");
  const trainParts = [];

  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    const isLast = i === cars.length - 1;

    if (car === "H") {
      if (isLast) {
        trainParts.push("HHH>");
      } else {
        trainParts.push("<HHHH");
      }
    } else if (car === "R") {
      trainParts.push("|hThT|");
    } else if (car === "P") {
      trainParts.push("|OOOO|");
    }
  }
  const result = trainParts.join("::");
  return result;
}

const trainString = drawTrain("HPRPH");

console.log("Full train:", trainString);

const detachEnd = (trainPartResult) => {
  const newTrain = trainPartResult.split("::");
  newTrain.pop();
  return newTrain.join("::");
};

const detachHead = (detachEndResult) => {
  const newTrain = detachEndResult.split("::");
  newTrain.shift();
  return newTrain.join("::");
};

const trainWithoutEnd = detachEnd(trainString);
console.log("Without end:", trainWithoutEnd);

const trainWithoutHeadAndEnd = detachHead(trainWithoutEnd);
console.log("Without head and end:", trainWithoutHeadAndEnd);
