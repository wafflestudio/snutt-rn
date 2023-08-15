import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Timetable } from '../../../components/Timetable';
import { useColors } from '../../../queries/useColors';
import { useMainScreenContext } from '..';
import { useFriendRegisteredCourseBooks } from '../../../queries/useFriendRegisteredCourseBooks';
import { useState } from 'react';

import { CourseBook } from '../../../../entities/courseBook';
import { useFriends } from '../../../queries/useFriends';
import { useFriendPrimaryTable } from '../../../queries/useFriendPrimaryTable';
import User from '../../../assets/user.svg';

import { useServiceContext } from '../../../../main';
import { Select } from '../../../components/Select';

export const FriendTimetable = () => {
  const { courseBookService } = useServiceContext();
  const { data: friends } = useFriends({ state: 'ACTIVE' });
  const [selectedCourseBook, setSelectedCourseBook] = useState<CourseBook>();
  const { selectedFriendId } = useMainScreenContext();
  const { data: palette } = useColors();
  const { data: courseBooks } = useFriendRegisteredCourseBooks(selectedFriendId);
  const selectedCourseBookWithDefault = selectedCourseBook ?? courseBooks?.at(0);
  const { data: fullTimetable } = useFriendPrimaryTable(
    selectedCourseBookWithDefault &&
      selectedFriendId && {
        friendId: selectedFriendId,
        courseBook: selectedCourseBookWithDefault,
      },
  );
  const selectedFriend = friends?.find((f) => f.friendId === selectedFriendId);

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.nickname}>
          <User width={120} height={40} /> {selectedFriend?.nickname}#{selectedFriend?.tag}
        </Text>

        <Select
          value={selectedCourseBookWithDefault && courseBookService.toValue(selectedCourseBookWithDefault)}
          onChange={(v) => setSelectedCourseBook(courseBookService.fromValue(v))}
          items={courseBooks?.map((cb) => ({
            label: `${cb.year}-${cb.semester}`,
            value: courseBookService.toValue(cb),
          }))}
        />
      </View>
      {palette && fullTimetable && <Timetable palette={palette} timetable={fullTimetable} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: 'white' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 36,
  },
  nickname: { fontSize: 14, fontWeight: '500', color: '#1ca6a0' },
});
