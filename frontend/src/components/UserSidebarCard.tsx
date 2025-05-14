import '@/assets/react.svg'; // 替换为实际的图片路径

const UserSidebarCard = () => {
  const walletAddress = '0x7e...C1f4';
  const nickname = '匿名用户 #28';
  const avatarUrl = 'react.svg'; // 可替换为随机生成图像

  return (
    <div className="rounded-2xl shadow p-4 bg-white space-y-4">
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-sm text-gray-500">{walletAddress}</div>
          <div className="font-semibold">{nickname}</div>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl">
        发布新评论
      </button>
    </div>
  );
};

export default UserSidebarCard;
