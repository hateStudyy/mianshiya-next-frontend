
export default function Page({ params }: { params: { questionId: string } }) {
    return <div>
        我的题目: {params.questionId}</div>;
}
