"use server";
// 引入样式
import "./index.css";
import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { AxiosResponse } from "axios";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";

// 主页
export default async function HomePage() {
  let questionBankList = [];
  let questionList = [];

  try {
    const questionBankRes: AxiosResponse =
      await listQuestionBankVoByPageUsingPost({
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e: any) {
    console.error("获取题库列表失败，" + e.message);
  }

  try {
    const questionListRes: AxiosResponse = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionListRes.data.records ?? [];
  } catch (e: any) {
    console.error("获取题目列表失败，" + e.message);
  }
  return (
    <main id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/bank"}>查看更多</Link>
      </Flex>
      <Title level={3}>最新题库</Title>
      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Title level={3}>最新题目</Title>
      <QuestionList questionList={questionList} />
    </main>
  );
}
