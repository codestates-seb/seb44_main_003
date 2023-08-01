package com.ott.server.report.service;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.member.entity.Member;
import com.ott.server.report.entity.Report;
import com.ott.server.report.repository.ReportRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;


    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }
    @Transactional(propagation = Propagation.REQUIRED)
    public Report createReport(Report report){
        report.setCompletion(false);

        return reportRepository.save(report);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Report updateReport(Report report, Member member){
        Report findReport = verifiedReport(report.getId());
        if (!member.equals(findReport.getMember()) && !member.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
        }

        Optional.ofNullable(report.getTitle())
                .ifPresent(title -> findReport.setTitle(title));
        Optional.ofNullable(report.getContent())
                .ifPresent(content -> findReport.setContent(content));
        Optional.ofNullable(report.getCompletion())
                .ifPresent(completion -> findReport.setCompletion(completion));

        return reportRepository.save(findReport);
    }

    public Report getReport(Long id){
        return verifiedReport(id);
    }

    public Page<Report> getReports(int page, int size){

        return reportRepository.findAll(PageRequest.of(page, size, Sort.by("lastModifiedAt").descending()));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteReport(Long id, Member member){
        Report report = verifiedReport(id);
        if (!member.equals(report.getMember()) && !member.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
        }
        reportRepository.delete(report);
    }


    private Report verifiedReport(Long id){
        Optional<Report> report = reportRepository.findById(id);
        if(report.isPresent()) return report.get();
        else throw new BusinessLogicException(ExceptionCode.REPORT_NOT_FOUND);
    }
}
