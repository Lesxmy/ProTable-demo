//https://alibaba.github.io/rex-design/docs/pro-table

import "./styles.css";
import { ProTable } from "@rexd/core";
import React, { useState, useEffect } from "react";

class FootDynamicValue {
  columnName?: string; // 列名称
  workTime!: string;
  showRedState!: boolean;
  attendanceType?: string; // 班次
}
class AttendanceDetailCSumFooterTotalVO {
  listDynamicValue!: FootDynamicValue[]; //	脚部动态日期统计值
  mosTotalAttendance!: FootDynamicValue[]; //考勤明细汇总表基本信息
  sfRequiredAttendance!: FootDynamicValue[];
  sfTotalAttendance!: FootDynamicValue[];
  workType!: number;
}
class AttendanceDetailSumBaseVO {
  bcmc!: string; //	班次名称
  cjmc!: string; //	产线名称
  employCode!: string; //	工号
  gzmc!: string; //	工种名称
  mosTotalAttendance!: FootDynamicValue[]; //	Mos出勤工时对像
  name!: string; //		姓名
  qymc!: string; //		区域名称
  sfRequiredAttendance!: string; //	SF应出勤工时对像
  sfTotalAttendance!: string; //		Sf出勤工时对像
  listDynamicValue!: FootDynamicValue[]; //		动态日期对应工时值
}
export default function App() {
  const [expand, setExpand] = useState<boolean>(false),
    [codes, setCodes] = useState<string[]>([]),
    [data, setData] = useState<any[]>([]),
    footData: any[] = [
      {
        sfRequiredAttendance: {
          workTime: "0",
          showRedState: false
        },
        mosTotalAttendance: {
          workTime: "653.50",
          showRedState: true
        },
        sfTotalAttendance: {
          workTime: "0",
          showRedState: true
        },
        workType: 0,
        "Mos04/01出勤工时(H)": {
          workTime: "76.50",
          showRedState: true
        },
        "Sf04/01出勤工时(H)": {
          workTime: "0",
          showRedState: true
        },

        footerRow: true,
        gzmc: "工时合计值"
      }
    ],
    [loading, setLoading] = useState(false),
    expandFootList: any[] = [
      {
        sfRequiredAttendance: {
          workTime: "0",
          showRedState: false
        },
        mosTotalAttendance: {
          workTime: "653.50",
          showRedState: true
        },
        sfTotalAttendance: {
          workTime: "0",
          showRedState: true
        },
        workType: 0,
        "Mos04/01出勤工时(H)": {
          workTime: "76.50",
          showRedState: true
        },
        "Sf04/01出勤工时(H)": {
          workTime: "0",
          showRedState: true
        },

        footerRow: true,
        cjmc: "工时合计值"
      }
    ],
    Columns: any[] = [
      {
        title: "工号",
        dataIndex: "employCode",
        align: "center",
        width: 90,
        lock: true,
        features: { enforceVisible: true }
      },
      {
        title: "姓名",
        dataIndex: "name",
        align: "center",
        width: 90,
        fixed: "left",
        lock: true,
        features: { enforceVisible: true }
      },
      {
        title: (
          <>
            <span
              onClick={() => {
                setExpand(!expand);
                setCodes(!expand ? ["qymc", "cjmc", "bcmc", "gzmc"] : []);
              }}
            >
              {expand ? "(收起)" : "(展开)"}
            </span>
            MOS
          </>
        ),
        code: "mos",
        lock: true,
        headerCellProps: {
          className: "no-bottom no-line expand-line"
        },
        features: { enforceVisible: true },
        children: [
          {
            title: "区域",
            dataIndex: "qymc",
            code: "qymc",
            align: "center",
            headerCellProps: {
              className: "no-line"
            },
            width: 60
          },
          {
            title: "产线",
            dataIndex: "cjmc",
            code: "cjmc",
            align: "center",
            width: 120,
            headerCellProps: {
              className: "no-line"
            },
            features: { enforceVisible: true }
          },
          {
            title: "班次",
            dataIndex: "bcmc",
            code: "bcmc",
            align: "center",
            width: 60,
            headerCellProps: {
              className: "no-line"
            }
          },
          {
            title: "工种",
            code: "gzmc",
            dataIndex: "gzmc",
            align: "center",
            width: 90,
            headerCellProps: {
              className: "show-line"
            }
          }
        ]
      },
      {
        title: "SF应出勤工时合计（H）",
        dataIndex: "sfRequiredAttendance",
        code: "sfRequiredAttendance",
        align: "center",
        features: { enforceVisible: true },
        width: 118,
        lock: true,
        render: (text: any) => {
          return (
            <div className={text?.showRedState ? "redFlag" : ""}>
              {text ? text.workTime : ""}
            </div>
          );
        }
      },
      {
        title: "出勤工时合计（H）",
        headerCellProps: {
          className: "no-bottom no-line"
        },
        align: "center",
        children: [
          {
            title: "MOS",
            dataIndex: "mosTotalAttendance",
            width: 85,
            code: "mosTotalAttendance",
            align: "center",
            headerCellProps: {
              className: "no-line"
            },
            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            },
            features: { enforceVisible: true }
          },
          {
            title: "SF",
            dataIndex: "sfTotalAttendance",
            width: 85,
            code: "sfTotalAttendance",
            fixed: "left",
            align: "center",
            headerCellProps: {
              className: "show-line"
            },
            features: { enforceVisible: true },

            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            }
          }
        ]
      },
      {
        title: "04/01出勤工时(H)",
        headerCellProps: {
          className: "no-bottom no-line"
        },
        // lock: true,
        align: "center",
        children: [
          {
            title: "MOS",
            dataIndex: "Mos04/01出勤工时(H)",
            width: 85,
            code: "Mos04/01出勤工时(H)",
            align: "center",
            headerCellProps: {
              className: "no-line"
            },
            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            },
            features: { enforceVisible: true }
          },
          {
            title: "SF",
            dataIndex: "Sf04/01出勤工时(H)",
            width: 85,
            code: "Sf04/01出勤工时(H)",
            fixed: "left",
            align: "center",
            headerCellProps: {
              className: "show-line"
            },
            features: { enforceVisible: true },

            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            }
          }
        ]
      },
      {
        title: "04/01出勤工时(H)",
        headerCellProps: {
          className: "no-bottom no-line"
        },
        // lock: true,
        align: "center",
        children: [
          {
            title: "MOS",
            dataIndex: "Mos04/01出勤工时(H)",
            width: 85,
            code: "Mos04/01出勤工时(H)",
            align: "center",
            headerCellProps: {
              className: "no-line"
            },
            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            },
            features: { enforceVisible: true }
          },
          {
            title: "SF",
            dataIndex: "Sf04/01出勤工时(H)",
            width: 85,
            code: "Sf04/01出勤工时(H)",
            fixed: "left",
            align: "center",
            headerCellProps: {
              className: "show-line"
            },
            features: { enforceVisible: true },

            render: (text: any) => {
              return (
                <div className={text?.showRedState ? "redFlag" : ""}>
                  {text ? text.workTime : ""}
                </div>
              );
            }
          }
        ]
      }
    ];
  useEffect(() => {
    const data: any[] = [];
    for (let i = 0; i < 200; i++) {
      data.push(
        {
          employCode: "90000003",
          name: "梁静芸",
          qymc: "F5",
          cjmc: "电化学",
          bcmc: "白班",
          gzmc: "正式工",
          sfRequiredAttendance: {
            workTime: 0,
            showRedState: false
          },
          mosTotalAttendance: {
            workTime: 84,
            showRedState: true
          },
          sfTotalAttendance: {
            workTime: 0,
            showRedState: true
          },
          "Mos04/01出勤工时(H)": {
            workTime: 10.5,
            attendanceType: "",
            showRedState: true
          },
          "Sf04/01出勤工时(H)": {
            workTime: 0,
            attendanceType: "",
            showRedState: true
          }
        },
        {
          employCode: "90000005",
          name: "黄玉兰",
          qymc: "F5",
          cjmc: "电化学",
          bcmc: "白班",
          gzmc: "正式工",
          sfRequiredAttendance: {
            workTime: 0,
            showRedState: false
          },
          mosTotalAttendance: {
            workTime: 10.5,
            showRedState: true
          },
          sfTotalAttendance: {
            workTime: 0,
            showRedState: true
          },
          "Mos04/01出勤工时(H)": {
            workTime: 0,
            attendanceType: "",
            showRedState: false
          },
          "Sf04/01出勤工时(H)": {
            workTime: 0,
            attendanceType: "",
            showRedState: false
          }
        },
        {
          employCode: "92000634",
          name: "陈满凤",
          qymc: "F5",
          cjmc: "电化学",
          bcmc: "白班",
          gzmc: "正式工",
          sfRequiredAttendance: {
            workTime: 0,
            showRedState: false
          },
          mosTotalAttendance: {
            workTime: 70,
            showRedState: true
          },
          sfTotalAttendance: {
            workTime: 0,
            showRedState: true
          },
          "Mos04/01出勤工时(H)": {
            workTime: 10.5,
            attendanceType: "",
            showRedState: true
          },
          "Sf04/01出勤工时(H)": {
            workTime: 0,
            attendanceType: "",
            showRedState: true
          }
        }
      );
    }
    setData(data);
  }, []);
  return (
    <div className="App">
      <ProTable
        className={"tableList"}
        footerDataSource={expand ? footData : expandFootList}
        columns={Columns as any}
        dataSource={data}
        primaryKey={(record: { employCode: string }) =>
          String(record?.employCode) + Math.random()
        }
        isLoading={loading}
        columnFilter={{
          visibleCodes: codes
        }}
        style={{ height: 600, overflow: "auto" }}
      />
    </div>
  );
}
