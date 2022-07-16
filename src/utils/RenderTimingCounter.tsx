import React, {
  Profiler,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ProfilerRenderCallback } from "../types/timing";

type RenderTimingCounterProps = {
  id: string;
  children: ReactElement;
};

const RENDER_DATA_LOCAL_STORAGE_ID = "renderData";
const MAX_ALLOWED_RENDER_TIME_MS = 5000;

export default function RenderTimingCounter({
  id,
  children,
}: RenderTimingCounterProps): ReactElement {
  const [renderData, setRenderData] = useState<ProfilerRenderCallback[]>([]);
  const [actualRenderTime, setActualRenderTime] = useState<number>();
  const [totalRenderTime, setTotalRenderTime] = useState<number>();
  const [allowedTimeFinished, setAllowedTimeFinished] =
    useState<boolean>(false);

  const saveRenderData = useCallback(
    (
      id: string,
      phase: "mount" | "update",
      actualDuration: number,
      baseDuration: number,
      startTime: number,
      commitTime: number
    ) => {
      console.log("data change");
      localStorage.setItem(
        RENDER_DATA_LOCAL_STORAGE_ID + `_at_${startTime}`,
        JSON.stringify({
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
        })
      );
    },
    []
  );

  const setRenderDataFromLocalStorage = useCallback(() => {
    const renderDataKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith(RENDER_DATA_LOCAL_STORAGE_ID)
    );
    const rawRenderData: ProfilerRenderCallback[] = renderDataKeys
      .map((key) => localStorage.getItem(key))
      .filter((rawData) => rawData !== null)
      .map((rawData) => JSON.parse(rawData!) as ProfilerRenderCallback)
      .sort((a, b) => {
        return a.startTime - b.startTime;
      });

    console.log(rawRenderData);
    setRenderData(rawRenderData);
    localStorage.clear();
  }, []);

  const sumRenderingTimes = useCallback(() => {
    if (renderData.length > 0) {
      const actualTime = renderData.reduce((sum, renderPartTime) => {
        sum += renderPartTime.actualDuration;
        return sum;
      }, 0);

      setActualRenderTime(actualTime);
      setTotalRenderTime(
        renderData[renderData.length - 1].commitTime - renderData[0].startTime
      );
    }
  }, [renderData]);

  useEffect(() => {
    if (!allowedTimeFinished) {
      localStorage.clear();
      const interval = setInterval(() => {
        setAllowedTimeFinished(true);
        setRenderDataFromLocalStorage();
        clearInterval(interval);
      }, MAX_ALLOWED_RENDER_TIME_MS);

      return () => {
        clearInterval(interval);
      };
    }
  }, [allowedTimeFinished, setRenderDataFromLocalStorage, sumRenderingTimes]);

  useEffect(() => {
    sumRenderingTimes();
  }, [sumRenderingTimes]);

  if (allowedTimeFinished) {
    return (
      <>
        {allowedTimeFinished && (
          <>
            <p>Actual render time: {actualRenderTime}</p>
            <p>Total render time: {totalRenderTime}</p>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <Profiler id={id} onRender={saveRenderData}>
          {children}
        </Profiler>
      </>
    );
  }
}
