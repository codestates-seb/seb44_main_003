package com.ott.server.report.controller;

import com.ott.server.dto.MultiResponseDto;
import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.member.entity.Member;
import com.ott.server.member.repository.MemberRepository;
import com.ott.server.report.dto.ReportDto;
import com.ott.server.report.entity.Report;
import com.ott.server.report.mapper.ReportMapper;
import com.ott.server.report.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    private final ReportService reportService;
    private final ReportMapper reportMapper;
    private final MemberRepository memberRepository;
    private final MediaRepository mediaRepository;

    public ReportController(ReportService reportService, ReportMapper reportMapper, MemberRepository memberRepository, MediaRepository mediaRepository) {
        this.reportService = reportService;
        this.reportMapper = reportMapper;
        this.memberRepository = memberRepository;
        this.mediaRepository = mediaRepository;
    }

    @PostMapping
    public ResponseEntity postReport(@Valid @RequestBody ReportDto.Post requestBody,
                                     Authentication authentication){
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Media media = mediaRepository.findByMediaId(requestBody.getMediaId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));

        Report report = reportMapper.reportPostToReport(requestBody);
        report.setMember(member);
        report.setMedia(media);
        Report response = reportService.createReport(report);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/{report-id}")
    public ResponseEntity patchReport(@PathVariable("report-id") @Positive Long id,
                                      @RequestBody ReportDto.Patch requestBody,
                                      Authentication authentication){
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Report report = reportMapper.reportPatchToReport(requestBody);


        report.setId(id);
        Report response = reportService.updateReport(report, member);

        return new ResponseEntity(reportMapper.reportToReportResponse(report), HttpStatus.OK);
    }

    @GetMapping("/{report-id}")
    public ResponseEntity getReport(@PathVariable("report-id") @Positive Long id){
        Report response = reportService.getReport(id);

        return new ResponseEntity(reportMapper.reportToReportResponse(response), HttpStatus.OK);
    }

    @GetMapping //관리자 권한으로 접근 가능
    public ResponseEntity getReports(@RequestParam(defaultValue = "1") int page,
                                     @RequestParam(defaultValue = "50000") int size){
        Page<Report> reports = reportService.getReports(page - 1, size);
        Pageable pageable = reports.getPageable();

        return new ResponseEntity(new MultiResponseDto(reportMapper.reportsToReportResponses(reports.getContent()), reports), HttpStatus.OK);
    }

    @DeleteMapping("/{report-id}")
    public ResponseEntity deleteReport(@PathVariable("report-id")@Positive Long id,
                                       Authentication authentication){
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        reportService.deleteReport(id, member);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
