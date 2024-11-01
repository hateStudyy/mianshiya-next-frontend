"use server";
// 引入样式
import "./index.css";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { AxiosResponse } from "axios";
import QuestionBankList from "@/components/QuestionBankList";

// 主页
export default async function BanksPage() {
  let questionBankList = [];
    const pageSize = 200;

    try {
    const questionBankRes: AxiosResponse =
      await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e: any) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <main id="banksPage" className="max-width-content">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </main>
  );
}
