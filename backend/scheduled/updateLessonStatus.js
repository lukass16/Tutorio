const cron = require("cron").CronJob;

const Lesson = require("../models/lesson");

const udpateLessonStatus = async () => {
  console.log("Updating lesson status...");

  const currentDate = new Date();
  pendingTime = 24 * 60 * 60 * 1000; // time for lesson to transition to finished (milliseconds)
  let acceptedLessons;
  let pendingLessons;

  // find all lessons that had been accepted and need updating
  try {
    acceptedLessons = await Lesson.find({ status: "ACCEPTED" });
    console.log(acceptedLessons);

    for (let lesson of acceptedLessons) {
      if (lesson.end < currentDate) {
        lesson.status = "PENDING";
        console.log("Performing transaction for pending lesson...");
        await lesson.save();
      }
    }
  } catch (err) {
    console.log(err);
  }

  // find all lessons that had been pending and need updating

  try {
    pendingLessons = await Lesson.find({ status: "PENDING" });
    console.log(pendingLessons);

    for (let lesson of pendingLessons) {
      if (lesson.end.valueOf() < currentDate.valueOf() - pendingTime) {
        lesson.status = "FINISHED";
        await lesson.save();
        console.log("Performing transaction for finished lesson...");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const updateLessonJob = new cron(
  "*/1 * * * *",
  udpateLessonStatus,
  null,
  false,
  "Europe/Riga"
); // runs every 1 minute

module.exports = updateLessonJob;
