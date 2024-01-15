import style from "./page.module.scss";
import Image from "next/image"
import HeartIcon from "@/assets/icons/heart.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import '@toast-ui/editor/dist/toastui-editor.css';
import { notoSansKr } from "@/app/layout";

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const temp = `<h1>이글의 <strong>h1 내용어쩌</strong></h1><p>고 저쩌도인데</p><h2>h2 sodud인부분</h2><h1>1234567</h1><p><br></p><div contenteditable="false"><hr></div><blockquote><p>123456789'</p><blockquote><p>12345678</p></blockquote></blockquote><p><br></p><ul><li><p>12345</p></li><li><p>2222</p></li></ul><ul><li class="task-list-item" data-task="true"><p>2345</p></li></ul><ol><li><p>34565</p></li><li><p>345678</p></li><li><p>67890-2111111</p></li></ol>`
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const resp = await fetch(`${serverURL}/api/post/${props.params.id}`);
  const post = await resp.json();
  const { title, content, likes, authorId } = post.data;
  return (
    <div className={style.container}>
      <div className={style.post}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.infoWrap}>
          <div className={style.info1}>
            <Image
              width={28}
              height={28}
              className={style.profileImg}
              src={authorId.picture}
              alt="user profile"
            />
            <p className={style.userName}>{authorId.name}</p>
            <p className={style.point}>·</p>
            <p className={style.day}>12시간 전</p>
          </div>
          <div className={style.info2}>
            <span>
              <HeartIcon />
              <p>{likes}</p>
            </span>
            <span>
              <BookmarkIcon />
              <p>저장</p>
            </span>
          </div>
        </div>
        <main className={'toastui-editor-contents'}>
          <div className={notoSansKr.className} dangerouslySetInnerHTML={{ __html: content }} />
        </main>
      </div>
    </div>
  )
}