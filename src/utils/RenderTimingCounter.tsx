import React, {
  Profiler,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import debounce from "lodash.debounce";
import { ProfilerRenderCallback } from "../types/timing";

type RenderTimingCounterProps = {
  id: string;
  children: ReactElement;
  onFinish: () => void;
};

const MAX_ALLOWED_RENDER_PAUSE_TIME_MS = 2000;

export default function RenderTimingCounter({
  id,
  children,
  onFinish,
}: RenderTimingCounterProps): ReactElement {
  const [actualRenderTime, setActualRenderTime] = useState<number>();
  const [totalRenderTime, setTotalRenderTime] = useState<number>();
  const [allowedRenderPauseTimeFinished, setAllowedRenderPauseTimeFinished] =
    useState<boolean>(false);
  const renderTimesRef = useRef<ProfilerRenderCallback[]>([]);

  const sumRenderingTimes = useCallback(() => {
    const actualTime = renderTimesRef.current.reduce((sum, renderPartTime) => {
      sum += renderPartTime.actualDuration;
      return sum;
    }, 0);

    setActualRenderTime(actualTime);
    setTotalRenderTime(
      renderTimesRef.current[renderTimesRef.current.length - 1].commitTime -
        renderTimesRef.current[0].startTime
    );

    console.log("Actual render time: " + actualTime);
    console.log(
      "Total render time: " +
        (renderTimesRef.current[renderTimesRef.current.length - 1].commitTime -
          renderTimesRef.current[0].startTime)
    );
  }, []);

  const changeHandler = useCallback(() => {
    setAllowedRenderPauseTimeFinished(true);
    sumRenderingTimes();
    onFinish();
  }, [sumRenderingTimes, onFinish]);

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, MAX_ALLOWED_RENDER_PAUSE_TIME_MS),
    [changeHandler]
  );

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
      debouncedChangeHandler();
      renderTimesRef.current.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      });
    },
    [debouncedChangeHandler]
  );

  if (allowedRenderPauseTimeFinished) {
    return (
      <>
        <p>Actual render time: {actualRenderTime}</p>
        <p>Total render time: {totalRenderTime}</p>
      </>
    );
  } else {
    return (
      <Profiler id={id} onRender={saveRenderData}>
        {children}
      </Profiler>
    );
  }
}
