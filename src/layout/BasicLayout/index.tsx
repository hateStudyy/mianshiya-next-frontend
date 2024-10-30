"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message } from "antd";
import React, { useState } from "react";
import "./index.css";

import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menus";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import DEFAULT_USER from "@/constants/user";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

/**
 * 全局通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log(res);
  });
  const loginUser = useSelector((state: RootState) => state.loginUser);

  const pathname = usePathname();

  const [text, setText] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
    return;
  };

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        layout="top"
        title="面试鸭刷题平台"
        logo={
          <Image
            src="/assets/logo.png"
            alt="面试鸭刷题网站"
            width={32}
            height={32}
          />
        }
        bgLayoutImgList={[
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            left: 85,
            bottom: 100,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            bottom: -68,
            right: -45,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
            bottom: 0,
            left: 0,
            width: "331px",
          },
        ]}
        location={{
          pathname,
        }}
        menu={{
          type: "group",
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "鱼皮鸭",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    // 退出登录
                    if (key === "logout") {
                      userLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        // 操作渲染
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/liyupi/mianshiya-next"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        // 菜单项数据
        menuDataRender={() => {
          return menus;
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
        footerRender={() => <GlobalFooter />}
        headerTitleRender={(logo, title, _) => {
          return (
            <a href="https://www.mianshiya.com" target="_blank">
              {logo}
              {title}
            </a>
          );
        }}
      >
        {children}
        <PageContainer>
          <ProCard
            style={{
              height: "100vh",
              minHeight: 800,
            }}
          >
            <MdEditor value={text} onChange={setText} />
            <MdViewer value={text} />
            {JSON.stringify(loginUser)}
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
