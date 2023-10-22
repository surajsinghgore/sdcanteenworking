import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../styles/ItemSkeleton.module.css";

export default function ItemSkeleton() {
  return (
    <>

<Skeleton count={1} className={styles.heading} />
      <div className={styles.Main}>
        <div className={styles.card}>
                   <div className={styles.img}>
            <Skeleton count={1} className={styles.ImagePad} />
          </div>
          <div className={styles.data}>
            <Skeleton count={1} className={styles.Title} />

            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
          </div>
        </div>

        <div className={styles.card}>
                   <div className={styles.img}>
            <Skeleton count={1} className={styles.ImagePad} />
          </div>
          <div className={styles.data}>
            <Skeleton count={1} className={styles.Title} />

            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
          </div>
        </div>


        <div className={styles.card}>
                   <div className={styles.img}>
            <Skeleton count={1} className={styles.ImagePad} />
          </div>
          <div className={styles.data}>
            <Skeleton count={1} className={styles.Title} />

            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
          </div>
        </div>


        <div className={styles.card}>
                   <div className={styles.img}>
            <Skeleton count={1} className={styles.ImagePad} />
          </div>
          <div className={styles.data}>
            <Skeleton count={1} className={styles.Title} />

            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
          </div>
        </div>


        <div className={styles.card}>
                   <div className={styles.img}>
            <Skeleton count={1} className={styles.ImagePad} />
          </div>
          <div className={styles.data}>
            <Skeleton count={1} className={styles.Title} />

            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
            <Skeleton count={1} className={styles.desc} />
          </div>
        </div>
      </div>
    </>
  );
}
