// 引入样式
import "./index.css";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

// 主页
export default function HomePage() {
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log(res);
  });
  return (
    <main id="homePage">
      <div>程序员鱼皮x编程导航的项目教程</div>
    </main>
  );
}
