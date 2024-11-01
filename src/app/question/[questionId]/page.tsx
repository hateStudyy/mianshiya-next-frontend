import "./index.css";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionPage({ params }: any) {
  const { questionId } = params;

  let question = undefined;
  try {
    const questionRes: any = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e: any) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="QuestionPage">
      <Flex>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
