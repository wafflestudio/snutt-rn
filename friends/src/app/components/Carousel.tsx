import { ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

type Props<K extends string> = {
  current: K;
  setCurrent: (key: K) => void;
  items: { key: K; item: ReactElement }[];
  width: number;
  gap: number;
};

export const Carousel = <K extends string>({ items, gap, width, current, setCurrent }: Props<K>) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const listRef = useRef<FlatList>(null);
  const itemWidth = width - gap;

  const onScroll = (e: any) => {
    if (!isScrolling) return;
    const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrent(items[newPage].key);
  };

  useEffect(() => {
    if (isScrolling) return;
    listRef.current?.scrollToOffset({ offset: width * items.findIndex((i) => i.key === current), animated: true });
  }, [current, items, width, isScrolling]);

  return (
    <View style={{ width }}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={items}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item.key}
        pagingEnabled
        renderItem={({ item }) => <View style={{ width: itemWidth, marginHorizontal: gap / 2 }}>{item.item}</View>}
        snapToAlignment="start"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScroll={onScroll}
        onScrollEndDrag={() => setIsScrolling(false)}
        ref={listRef}
      />
      <View style={styles.dots}>
        {items.map((i) => (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ ...styles.dot, backgroundColor: current === i.key ? '#000' : '#777' }}
            key={i.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dots: { display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 18 },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
