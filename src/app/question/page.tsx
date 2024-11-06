import Title from "antd/es/typography/Title";
import {listQuestionVoByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import "./index.css";
import QuestionTable from "../../components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionPage({ searchParams }: any) {
  let questionList = [];
  let total = 0;
  const { q: searchText } = searchParams;

  try {
    const questionRes: any = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionRes.data.records ?? [];
    total = questionRes.data.total ?? 0;
  } catch (e: any) {
    console.error("获取题目列表失败，" + e.message);
  }
  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
