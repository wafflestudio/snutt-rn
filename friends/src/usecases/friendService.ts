import { CourseBook } from '../entities/courseBook';
import { FriendId } from '../entities/friend';
import { Semester } from '../entities/semester';
import { FullTimetable } from '../entities/timetable';
import { DisplayName, Nickname, NicknameTag } from '../entities/user';
import { Year } from '../entities/year';

export type FriendService = {
  listFriends: (req: {
    state: 'ACTIVE' | 'REQUESTED' | 'REQUESTING';
  }) => Promise<{ friendId: FriendId; nickname: Nickname; tag: NicknameTag; displayName?: DisplayName }[]>;
  requestFriend: (req: { nickname: Nickname }) => Promise<void>;
  acceptFriend: (req: { friendId: FriendId }) => Promise<void>;
  declineFriend: (req: { friendId: FriendId }) => Promise<void>;
  deleteFriend: (req: { friendId: FriendId }) => Promise<void>;
  getFriendPrimaryTable: (req: { friendId: FriendId; semester: Semester; year: Year }) => Promise<FullTimetable>;
  getFriendRegisteredCourseBooks: (req: { friendId: FriendId }) => Promise<CourseBook[]>;
  patchFriendDisplayName: (req: { friendId: FriendId; displayName: DisplayName }) => Promise<void>;

  formatNickname: (
    req: { nickname: Nickname; tag: NicknameTag; displayName?: DisplayName },
    options?: { type: 'default' | 'displayName' | 'nickname' },
  ) => string;
  isValidNicknameTag: (str: string) => boolean;
  isValidDisplayName: (str: string) => boolean;
};
