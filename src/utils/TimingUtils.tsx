export const logTimes = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.group();
  console.log(`${id}'s ${phase} phase:`);
  console.log(`Actual time: ${actualDuration}`);
  console.log(`Base time: ${baseDuration}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
  console.groupEnd();
};
