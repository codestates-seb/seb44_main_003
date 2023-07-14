package com.ott.server.report.mapper;

import com.ott.server.report.dto.ReportDto;
import com.ott.server.report.entity.Report;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report reportPostToReport(ReportDto.Post requestBody);
    Report reportPatchToReport(ReportDto.Patch requestBody);
    @Mapping(target = "mediaId", source = "media.mediaId")
    ReportDto.Response reportToReportResponse(Report report);

    List<ReportDto.Response> reportsToReportResponses(List<Report> reports);
}
