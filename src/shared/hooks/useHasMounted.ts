"use client";

import { useEffect, useState } from "react";

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setHasMounted(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return hasMounted;
};

